import { Prisma } from '@prisma/client';

const userExtension = Prisma.defineExtension({
    query: {
        user: {
            create: async ({ args, query }) => {
                // Default the username to 'user' + id (which is a required field)
                if (!args.data?.username && args.data?.id) {
                    args.data.username = `user${args.data.id}`;
                }
                // Return the query after applying the default logic
                return query(args);
            },
        },
    },
});

export default userExtension;
