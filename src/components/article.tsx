'use client';
import { useState } from 'react';
import type { Article, Comment } from '@prisma/client';
import Link from 'next/link';

import { Button } from '~/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '~/components/ui/avatar';
import { Card, CardHeader, CardContent, CardFooter } from '~/components/ui/card';

import { BookmarkIcon } from '~/components/icons';
import { cn } from '~/lib/utils';

const fakeComments = [
    {
        id: '1',
        articleId: '101',
        userId: 'user-001',
        publishedAt: new Date('2025-01-27T12:00:00Z'),
        editedAt: null,
        content: 'This is the first comment.',
        userName: 'John Doe',
        userImageUrl: 'https://example.com/user001.jpg',
        parentCommentId: null,
        deletedAt: null,
    },
    {
        id: '2',
        articleId: '101',
        userId: 'user-002',
        publishedAt: new Date('2025-01-27T12:30:00Z'),
        editedAt: new Date('2025-01-27T12:45:00Z'),
        content: 'This is a reply to the first comment.',
        userName: 'Jane Smith',
        userImageUrl: 'https://example.com/user002.jpg',
        parentCommentId: 1,
        deletedAt: null,
    },
];

const Author = ({ className, data }: { className?: string; data: Article }) => {
    return (
        <div className={cn('flex items-center gap-2', className)}>
            <Avatar className='h-9 w-9'>
                <AvatarImage src='/placeholder.svg' />
                <AvatarFallback className='bg-orange-500'>IK</AvatarFallback>
            </Avatar>
            <div>
                <div className='flex items-center space-x-1'>
                    <Button variant='type11' asChild>
                        <Link className='text-sm font-medium text-base-200' href={'/' + data.userId}>
                            {data.userName ?? data.userId}
                        </Link>
                    </Button>
                    {data.organizationId ? (
                        <>
                            <div className='text-sm text-base-400'>for</div>
                            <Button variant='type11' asChild>
                                <Link className='text-sm font-normal text-base-200' href={'/' + data.organizationId}>
                                    {data.organizationName ?? data.organizationId}
                                </Link>
                            </Button>
                        </>
                    ) : null}
                </div>
                <p className='my-px text-xs text-base-400'>
                    {new Date(data.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    })}
                </p>
            </div>
        </div>
    );
};

const TagList = ({ className, data }: { className?: string; data: string[] }) => {
    const tags = data.length ? data : ['webdev', 'tutorial', 'frontend'];
    return (
        <div className={cn('flex flex-wrap gap-1', className)}>
            {tags.map((tag, index) => (
                <Button className='text-sm' key={index} variant='type9' size='xs'>
                    #{tag}
                </Button>
            ))}
        </div>
    );
};

const CommentList = ({ className, data }: { className?: string; data: Comment[] }) => {
    const comments = data.length ? data : fakeComments;
    return (
        <div className={cn('flex flex-col gap-4', className)}>
            {comments.map((comment, index) => (
                <div className='flex space-x-2 rounded-md text-sm' key={index}>
                    <div className='flex w-8 flex-row-reverse text-left'>
                        <Avatar className='h-6 w-6'>
                            <AvatarImage src='/placeholder.svg' />
                            <AvatarFallback className='bg-orange-500 text-xs'>YY</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className='flex-1 rounded-md bg-base-900 px-4 py-3'>
                        <div className='flex items-center space-x-2'>
                            <Link href='#' className='font-medium text-base-300 hover:text-blue-400'>
                                {comment.userId}
                            </Link>
                            <span className='mt-px text-xs text-base-400'>
                                {new Date(comment.publishedAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                })}
                            </span>
                        </div>
                        <p className='mt-px text-base-200'>{comment.content}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

const ArticleCard = ({
    className,
    showCommentsByDefault = true,
    data,
}: {
    className?: string;
    showCommentsByDefault: boolean;
    data: Article;
}) => {
    const { title, commentsCount, reactionsCount, path, userId } = data;
    const [showComments, setShowComments] = useState(showCommentsByDefault);

    return (
        <Card className={cn('w-full cursor-pointer border-0 bg-base-1000', className)}>
            <CardHeader className='pb-0'>
                <Author data={data} />
            </CardHeader>
            <CardContent>
                <Button className='my-2 pl-10 text-2xl font-bold' variant='type11' asChild>
                    <Link href={'/' + userId + '/' + path}>{title}</Link>
                </Button>
                <TagList data={data.tagList} className='pl-8' />
            </CardContent>
            <CardFooter className='mt-2 flex flex-col gap-4'>
                {/* Reactions */}
                <div className='flex w-full items-center justify-between pl-8'>
                    <div className='space-x-2'>
                        <Button className='text-sm' variant='type8' size='xs'>
                            {reactionsCount} Reactions
                        </Button>
                        <Button className='text-sm' variant='type8' size='xs'>
                            {commentsCount} Comments
                        </Button>
                    </div>
                    <div className='flex items-center gap-2'>
                        <span className='text-xs text-base-400'>5 min read</span>
                        <Button className='size-10 text-foreground' variant='type2' size='icon'>
                            <BookmarkIcon />
                        </Button>
                    </div>
                </div>
                {showComments ? <CommentList className='w-full' data={[]} /> : null}
                {commentsCount > 0 ? (
                    <div className='w-full'>
                        <Button
                            className='text-sm'
                            variant='type8'
                            size='sm'
                            onClick={() => setShowComments(!showComments)}
                        >
                            {showComments ? 'Hide comments' : 'See all comments'}
                        </Button>
                    </div>
                ) : null}
            </CardFooter>
        </Card>
    );
};

export { Author, TagList, CommentList, ArticleCard };
