'use client';
import { useEffect, useState } from 'react';

import { MarkdownWrapper } from '~/components/markdown';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Textarea } from '~/components/ui/textarea';
import { Toolbar } from '~/components/editor';
import { Button } from '~/components/ui/button';

import type { ImageFile } from '~/lib/types/image-file';
import { trpc } from '~/trpc/client';
import { useRouter } from 'next/navigation';

const CommentBox = ({ articleId }: { articleId: string }) => {
    const [content, setContent] = useState<string>('');
    const [images, setImages] = useState<ImageFile[]>([]);
    const [isPreview, setIsPreview] = useState<boolean>(false);
    const getS3ImageUploadUrl = trpc.image.getS3UploadUrl.useMutation();
    const publishComment = trpc.comment.publish.useMutation();
    const isPublishingComment = publishComment.isPending;
    const router = useRouter();

    // Clear existing images leaving page
    useEffect(() => {
        return () => {
            setImages((images) => {
                images.forEach((image) => URL.revokeObjectURL(image.previewUrl));
                return [];
            });
        };
    }, []);

    const handleTextChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = ev.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
        setContent(textarea.value);
    };

    const handlePublish = async () => {
        if (!content.trim()) return;
        const signedUrls: string[] = [];
        let updatedContent = content;
        try {
            const uploadImagePromises = images
                .filter((image) => content.includes('![Image description](' + image.previewUrl + ')'))
                .map(async (image) => {
                    const signedUrl = await getS3ImageUploadUrl.mutateAsync({
                        fileName: image.file.name.replace(/\.jpg$/, `-${Date.now()}.jpg`),
                        contentType: image.file.type,
                    });
                    const response = await fetch(signedUrl, {
                        method: 'PUT',
                        body: image.file,
                        headers: { 'Content-Type': image.file.type },
                    });
                    const imageUrl = response.url.split('?')[0];
                    if (!response.ok || !imageUrl) throw new Error('Image upload failed');

                    // Directly modify the content by replacing previewUrl with the uploaded image URL
                    updatedContent = updatedContent.replace(image.previewUrl, imageUrl);
                    // Track signed URL for deletion in case of failure
                    signedUrls.push(signedUrl);
                });

            // Wait for all image upload promises to resolve
            await Promise.all(uploadImagePromises);

            // Publish the comment to database
            await publishComment.mutateAsync({ content, articleId });

            // Refresh the page
            router.refresh();
        } catch {
            alert('error');
            await Promise.all(
                signedUrls.map(async (signedUrl) => {
                    await fetch(signedUrl, { method: 'DELETE' });
                })
            );
        }
    };

    return (
        <div className='my-12 flex gap-4'>
            <Avatar className='h-9 w-9'>
                <AvatarImage src='/placeholder.svg' />
                <AvatarFallback className='bg-orange-500'>IK</AvatarFallback>
            </Avatar>
            <div className='w-full space-y-2'>
                <div className='rounded-lg bg-background text-base focus-within:border focus-within:border-brand-800'>
                    {isPreview ? (
                        <MarkdownWrapper className='p-4'>{content}</MarkdownWrapper>
                    ) : (
                        <Textarea
                            className='p-4 placeholder:text-base-600'
                            value={content}
                            onChange={handleTextChange}
                            placeholder='Write something here...'
                        />
                    )}
                    <Toolbar className='mx-2' size={4} setContent={setContent} setImages={setImages} />
                </div>
                <div className='space-x-2'>
                    <Button
                        className='text-base font-medium'
                        variant='type6'
                        size='md'
                        onClick={handlePublish}
                        disabled={isPublishingComment}
                    >
                        Submit
                    </Button>
                    <Button
                        className='text-base font-medium'
                        variant='type7'
                        size='md'
                        onClick={() => setIsPreview((isPreview) => !isPreview)}
                    >
                        {isPreview ? 'Edit' : 'Preview'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CommentBox;
