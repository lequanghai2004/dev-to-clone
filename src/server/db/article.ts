import { Prisma } from '@prisma/client';

const articleExtension = Prisma.defineExtension({
    query: {
        article: {
            create: async ({ args, query }) => {
                // Generate the unique path by title + timestamp + user id
                args.data.path = args.data.title.toLowerCase().replace(/\s+/g, '-');
                args.data.path += '-' + args.data.user?.connect?.id + '-' + Date.now();
                // Return the query after applying the default logic
                return query(args);
            },
        },
    },
});

export default articleExtension;
