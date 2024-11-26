import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '~/server/api/root';

export const userRouter = createTRPCRouter({
    getByUsername: publicProcedure.input(z.object({ username: z.string() })).query(async ({ ctx, input }) => {
        try {
            const user = await ctx.db.user.findUnique({ where: { username: input.username } });
            return { success: true, data: { user } };
        } catch (error) {
            return { success: false, data: { error } };
        }
    }),
    getById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
        try {
            const user = await ctx.db.user.findUnique({ where: { id: input.id } });
            return { success: true, data: { user } };
        } catch (error) {
            return { success: false, data: { error } };
        }
    }),
});
