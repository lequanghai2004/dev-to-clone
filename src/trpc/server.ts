import 'server-only';

import { createHydrationHelpers } from '@trpc/react-query/rsc';
import { headers } from 'next/headers';
import { cache } from 'react';

import { createCallerFactory, createTRPCContext } from '~/server/api/root';
import { appRouter, type AppRouter } from '~/server/api/routes';
import { createQueryClient } from './query';

// Create a server-side caller for the tRPC API.
const createCaller = createCallerFactory(appRouter);

// Wrap the `createTRPCContext` helper
// Provides context for tRPC API when call from server component.
const appCaller = createCaller(
    cache(async () => {
        const heads = new Headers(await headers());
        heads.set('x-trpc-source', 'rsc');

        return createTRPCContext({
            headers: heads,
        });
    })
);

// API gateway for server side
export const { trpc, HydrateClient } = createHydrationHelpers<AppRouter>(appCaller, cache(createQueryClient));
