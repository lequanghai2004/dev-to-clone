import { z } from 'zod';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '~/server/api/root';

export const articleRouter = createTRPCRouter({
    publish: protectedProcedure
        .input(
            z.object({
                title: z.string(),
                content: z.string(),
                tags: z.array(z.string()),
                imageUrl: z.string().url().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { title, content, tags, imageUrl } = input;
            const { id, username: userName, image: userImageUrl } = ctx.session.user;

            // Save the article in the database
            try {
                const tagConnections = await Promise.all(
                    tags.map(async (value) => {
                        value = value.toLowerCase().trim();
                        const tag = await ctx.db.tag.upsert({
                            where: { name: value },
                            update: {},
                            create: { name: value, description: null },
                        });
                        return { id: tag.id };
                    })
                );

                const article = await ctx.db.article.create({
                    data: {
                        title,
                        userName,
                        userImageUrl,
                        imageUrl,
                        content,
                        user: { connect: { id } },
                        tags: { connect: tagConnections },
                    },
                });
                return { success: true, data: { article } };
            } catch (error) {
                return { success: false, data: { error } };
            }
        }),

    getLatest: publicProcedure.query(async ({ ctx }) => {
        try {
            const articles = await ctx.db.article.findMany({
                orderBy: { publishedAt: 'desc' },
                take: 10,
            });
            return { success: true, data: { articles } };
        } catch (error) {
            return { success: false, data: { error } };
        }
    }),

    getByPath: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
        try {
            const article = await ctx.db.article.findUnique({
                where: { path: input },
            });
            return { success: true, data: { article } };
        } catch (error) {
            return { success: false, data: { error } };
        }
    }),

    getByUser: publicProcedure
        .input(z.object({ userId: z.string(), limit: z.number().min(1).max(50).default(10).optional() }))
        .query(async ({ ctx, input }) => {
            try {
                const articles = await ctx.db.article.findMany({
                    where: { userId: input.userId },
                    orderBy: { publishedAt: 'desc' },
                    take: input.limit,
                });
                return { success: true, data: { articles } };
            } catch (error) {
                return { success: false, data: { error } };
            }
        }),

    getByTags: publicProcedure
        .input(
            z.object({
                tags: z.array(z.string()).min(1),
                limit: z.number().min(1).max(50).default(10),
                cursor: z.string().nullish(),
                matchAll: z.boolean().default(false),
            })
        )
        .query(async ({ ctx, input }) => {
            const { tags, limit, cursor, matchAll } = input;
            const normalizedTags = tags.map((tag) => tag.toLowerCase().trim());

            try {
                const articles = await ctx.db.article.findMany({
                    where: {
                        tags: matchAll
                            ? { every: { name: { in: normalizedTags } } }
                            : { some: { name: { in: normalizedTags } } },
                    },
                    take: limit + 1,
                    cursor: cursor ? { id: cursor } : undefined,
                    orderBy: { publishedAt: 'desc' },
                    include: { tags: true, user: { select: { id: true, name: true, image: true, username: true } } },
                });

                let nextCursor: typeof cursor = undefined;
                if (articles.length > limit) {
                    const nextItem = articles.pop();
                    nextCursor = nextItem?.id;
                }

                return {
                    success: true,
                    data: { articles, nextCursor },
                };
            } catch (error) {
                return { success: false, data: { error } };
            }
        }),
});
