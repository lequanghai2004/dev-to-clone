import type { Article } from '@prisma/client';

import { ArticleCard } from '~/components/article';
import { cn } from '~/lib/utils';

const NewsFeed = ({
    className,
    data,
    showCommentsByDefault = false,
}: {
    className?: string;
    data: Article[];
    showCommentsByDefault?: boolean;
}) => {
    return (
        <div className='flex w-full flex-col gap-y-2'>
            {data.map((post, index) => (
                <ArticleCard
                    key={index}
                    className={cn('w-full cursor-pointer border-0 bg-base-1000', className)}
                    data={post}
                    showCommentsByDefault={showCommentsByDefault}
                />
            ))}
        </div>
    );
};

export default NewsFeed;
