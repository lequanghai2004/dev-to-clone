'use client';

import { type QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { loggerLink, unstable_httpBatchStreamLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server';
import SuperJSON from 'superjson';

import { type AppRouter } from '~/server/api/routes';
import { createQueryClient } from './query';

// API gateway on client components
const trpc = createTRPCReact<AppRouter>();

// Context provider for queryClient and trpcClient
const TRPCReactProvider = ({ children }: { children: React.ReactNode }) => {
    // Server: always create a new instance
    // Browser: use singleton to avoid multiple instances
    const queryClient =
        typeof window === 'undefined'
            ? createQueryClient()
            : ((globalThis as unknown as Window & { queryClient?: QueryClient }).queryClient ??= createQueryClient());

    const trpcClient = trpc.createClient({
        links: [
            loggerLink({
                enabled: (op) =>
                    process.env.NODE_ENV === 'development' || (op.direction === 'down' && op.result instanceof Error),
            }),
            unstable_httpBatchStreamLink({
                transformer: SuperJSON,
                url:
                    (typeof window !== 'undefined'
                        ? window.location.origin
                        : process.env.VERCEL_URL
                          ? `https://${process.env.VERCEL_URL}`
                          : `http://localhost:${process.env.PORT ?? 3000}`) + '/api/trpc',
                headers: () => {
                    const headers = new Headers();
                    headers.set('x-trpc-source', 'nextjs-react');
                    return headers;
                },
            }),
        ],
    });

    return (
        <QueryClientProvider client={queryClient}>
            <trpc.Provider client={trpcClient} queryClient={queryClient}>
                {children}
            </trpc.Provider>
        </QueryClientProvider>
    );
};

export { trpc, TRPCReactProvider };
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
