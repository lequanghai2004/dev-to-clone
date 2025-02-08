import { createTRPCRouter } from './root';

import { commentRouter as comment } from './routers/comment';
import { articleRouter as article } from './routers/article';
import { imageRouter as image } from './routers/image';
import { userRouter as user } from './routers/user';

/**
 * This is the primary router for your server.
 * All routers in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({ comment, article, image, user });
export type AppRouter = typeof appRouter;
