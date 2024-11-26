import { notFound } from 'next/navigation';
import Image from 'next/image';

import InfoSidebar from '~/templates/info-sidebar';
import { MarkdownWrapper } from '~/components/markdown';
import { Button } from '~/components/ui/button';
import { Author, CommentList, TagList } from '~/components/article';
import { trpc } from '~/trpc/server';

import InteractionPanel from './interaction-panel';
import CommentBox from './comment-box';

const ArticlePage = async ({ params }: { params: Promise<{ user: string; article: string }> }) => {
    const { article } = await params;
    const articleResponse = await trpc.article.getByPath(article);
    const articleData = articleResponse.data.article;
    if (!articleResponse.success || !articleData) notFound();

    const imageUrl =
        articleData.imageUrl ??
        'https://dev-to-clone-bucket.s3.us-east-1.amazonaws.com/Chrysanthemum-1736473494567.jpg';
    const articleId = articleData.id;

    const commentsResponse = await trpc.comment.getByArticle({ articleId });
    const commentsData = commentsResponse.data.comments ?? [];

    // const handleReact = () => {};
    // const handleComment = () => {};

    return (
        <div className='mb-4 flex h-fit w-full gap-4'>
            {/* Pass server-fetched data to the InteractionPanel */}
            <InteractionPanel reactionsCount={articleData.reactionsCount} commentsCount={articleData.commentsCount} />
            {/* Main content */}
            <div className='h-fit grow rounded-md bg-base-1000'>
                <div className='relative aspect-[5/2] h-auto w-full'>
                    <Image
                        className='rounded-t-md object-cover'
                        src={imageUrl}
                        alt=''
                        priority
                        fill
                        placeholder='empty'
                        sizes='(max-width: 1024) 90vw, 60vw'
                    />
                </div>
                <div className='h-full px-16 py-8 text-lg'>
                    <Author data={articleData} />
                    <h1 className='my-4 text-5xl font-extrabold'>{articleData.title}</h1>
                    <TagList data={articleData.tagList} />
                    <MarkdownWrapper className='prose my-8'>{articleData.content}</MarkdownWrapper>
                    <div className='my-4 flex justify-between'>
                        <span className='my-auto text-xl font-bold'>Top comments</span>
                        <Button className='px-4 py-1' variant='type10'>
                            Subscribe
                        </Button>
                    </div>
                    <CommentBox articleId={articleId} />
                    <CommentList data={commentsData} />
                </div>
            </div>
            {/* Placeholder for additional content */}
            <InfoSidebar className='hidden basis-[30%] lg:block' />
        </div>
    );
};

export default ArticlePage;
