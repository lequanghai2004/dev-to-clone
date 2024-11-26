import { PrismaClient } from '@prisma/client';

import env from '~/env';

import userExtension from './user';
import articleExtension from './article';

const createPrismaClient = () => {
    const prismaClient = new PrismaClient({
        log: env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    })
        .$extends(userExtension)
        .$extends(articleExtension);

    return prismaClient;
};

const globalForPrisma = globalThis as unknown as {
    prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
