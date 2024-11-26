import { z } from 'zod';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '~/server/api/root';
import { TRPCError } from '@trpc/server';

export const commentRouter = createTRPCRouter({
    // Create a new comment
    publish: protectedProcedure
        .input(
            z.object({
                articleId: z.string(),
                content: z.string().min(1),
                parentCommentId: z.number().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { articleId, content, parentCommentId } = input;
            const { id, username: userName, image: userImageUrl } = ctx.session.user;

            try {
                // Create the comment
                const comment = await ctx.db.comment.create({
                    data: {
                        content,
                        userName,
                        userImageUrl,
                        parentCommentId,
                        article: { connect: { id: articleId } },
                        user: { connect: { id } },
                    },
                });

                // Increment the article's comment count
                await ctx.db.article.update({
                    where: { id: articleId },
                    data: { commentsCount: { increment: 1 } },
                });

                return { success: true, data: { comment } };
            } catch (error) {
                return { success: false, data: { error } };
            }
        }),

    // Get comments for an article
    getByArticle: publicProcedure
        .input(
            z.object({
                articleId: z.string(),
                cursor: z.string().nullish(),
                limit: z.number().min(1).max(100).default(20),
            })
        )
        .query(async ({ ctx, input }) => {
            const { articleId, cursor, limit } = input;

            try {
                const comments = await ctx.db.comment.findMany({
                    where: {
                        articleId,
                        deletedAt: null, // Only fetch non-deleted comments
                    },
                    take: limit + 1, // Take an extra item for cursor
                    cursor: cursor ? { id: cursor } : undefined,
                    orderBy: { publishedAt: 'desc' },
                    include: {
                        user: {
                            select: {
                                id: true,
                                username: true,
                                image: true,
                            },
                        },
                    },
                });

                let nextCursor: typeof cursor = undefined;
                if (comments.length > limit) {
                    const nextItem = comments.pop();
                    nextCursor = nextItem?.id;
                }

                return {
                    success: true,
                    data: {
                        comments,
                        nextCursor,
                    },
                };
            } catch (error) {
                return { success: false, data: { error } };
            }
        }),

    // Edit a comment
    edit: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                content: z.string().min(1),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { id, content } = input;

            try {
                // Verify comment ownership
                const comment = await ctx.db.comment.findUnique({
                    where: { id },
                    select: { userId: true },
                });

                if (!comment || comment.userId !== ctx.session.user.id) {
                    throw new TRPCError({
                        code: 'FORBIDDEN',
                        message: 'You can only edit your own comments',
                    });
                }

                // Update the comment
                const updatedComment = await ctx.db.comment.update({
                    where: { id },
                    data: {
                        content,
                        editedAt: new Date(),
                    },
                });

                return { success: true, data: { comment: updatedComment } };
            } catch (error) {
                return { success: false, data: { error } };
            }
        }),

    // Soft delete a comment
    delete: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
        try {
            // Verify comment ownership
            const comment = await ctx.db.comment.findUnique({
                where: { id: input.id },
                select: { userId: true, articleId: true },
            });

            if (!comment || comment.userId !== ctx.session.user.id) {
                throw new TRPCError({
                    code: 'FORBIDDEN',
                    message: 'You can only delete your own comments',
                });
            }

            // Soft delete the comment
            await ctx.db.comment.update({
                where: { id: input.id },
                data: { deletedAt: new Date() },
            });

            // Decrement the article's comment count
            await ctx.db.article.update({
                where: { id: comment.articleId },
                data: { commentsCount: { decrement: 1 } },
            });

            return { success: true };
        } catch (error) {
            return { success: false, data: { error } };
        }
    }),
});
