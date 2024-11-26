import { createTRPCRouter } from './root';

import { commentRouter } from './routers/comment';
import { articleRouter } from './routers/article';
import { imageRouter } from './routers/image';
import { userRouter } from './routers/user';

/**
 * This is the primary router for your server.
 * All routers in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    comment: commentRouter,
    article: articleRouter,
    image: imageRouter,
    user: userRouter,
});

export type AppRouter = typeof appRouter;
