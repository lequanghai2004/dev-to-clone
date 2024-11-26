'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
    Bold,
    Italic,
    Link,
    List,
    ListOrdered,
    Heading,
    Quote,
    Code,
    ImageIcon,
    // MoreHorizontal,
    Zap,
    Square,
    Bolt,
    X,
} from 'lucide-react';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import UploadImageButton from '~/templates/up-img-btn';
import { MarkdownWrapper } from '~/components/markdown';

import { cn } from '~/lib/utils';
import { trpc } from '~/trpc/client';
import { type ImageFile } from '~/lib/types/image-file';

/*
 * Bugs
 *  - Text color of bold, header, italic
 *  - Inconsistent scroll bar on mount
 *  - Preview text overflow
 */

const Toolbar = ({
    className,
    size = 6,
    setImages,
    setContent,
}: {
    className?: string;
    size?: number;
    setImages: React.Dispatch<React.SetStateAction<ImageFile[]>>;
    setContent: React.Dispatch<React.SetStateAction<string>>;
}) => {
    console.log('Toolbar is rendered');

    // Helper function to insert text at cursor or append
    const insertTextAtCursor = (beforeText = '', afterText = '') => {
        setContent((content) => `${content}${beforeText}${afterText}`);
    };

    const handleUpload = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const files = ev.target.files;
        if (!files) return;
        Array.from(files).forEach((file) => {
            const previewUrl = URL.createObjectURL(file);
            setImages((images) => [...images, { file, previewUrl }]);
            setContent((content) => content + '![Image description](' + previewUrl + ')');
        });
    };

    // Define toolbar actions
    const tools = [
        { icon: Bold, label: 'Bold', action: () => insertTextAtCursor('**', '**') },
        { icon: Italic, label: 'Italic', action: () => insertTextAtCursor('*', '*') },
        { icon: Link, label: 'Link', action: () => insertTextAtCursor('[', '](url)') },
        { icon: List, label: 'Bullet list', action: () => insertTextAtCursor('\n- ') },
        { icon: ListOrdered, label: 'Numbered list', action: () => insertTextAtCursor('\n1. ') },
        { icon: Heading, label: 'Heading', action: () => insertTextAtCursor('\n# ') },
        { icon: Quote, label: 'Quote', action: () => insertTextAtCursor('\n> ') },
        { icon: Code, label: 'Code', action: () => insertTextAtCursor('\n```\n', '\n```') },
        { icon: Square, label: 'Checkbox', action: () => insertTextAtCursor('\n- [ ] ') },
        { icon: Zap, label: 'Highlight', action: () => insertTextAtCursor('==', '==') },
    ];

    return (
        <div className={cn('flex items-center gap-1', className)}>
            {tools.map((tool, index) => (
                <Button
                    key={index}
                    size='icon'
                    className='h-10 text-base-200'
                    variant='type2'
                    onClick={tool.action}
                    title={tool.label}
                >
                    <tool.icon className={`h-${size} w-${size}`} strokeWidth='2' />
                </Button>
            ))}
            <UploadImageButton
                size='icon'
                className='h-10 text-base-200'
                variant='type2'
                onInputChange={handleUpload}
                title='Upload Image'
                multiple
            >
                <ImageIcon className={`h-${size} w-${size}`} strokeWidth='2' />
            </UploadImageButton>
        </div>
    );
};

const Editor = ({ className }: { className?: string }) => {
    const router = useRouter();
    const session = useSession();
    const publishArticle = trpc.article.publish.useMutation();
    const getS3ImageUploadUrl = trpc.image.getS3UploadUrl.useMutation();

    const [coverImage, setCoverImage] = useState<ImageFile | null>(null);
    const [title, setTitle] = useState<string>('Title');
    const [images, setImages] = useState<ImageFile[]>([]);
    const [tags, setTags] = useState<string[]>(['tag1', 'tag2', 'tag3', 'tag4']);
    const [selectedTag, setSelectedTag] = useState<number | null>(null);
    const [content, setContent] = useState<string>(
        'tailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/thytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/indcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/indcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/indcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typographytailwindcss/typography'
    );
    const [isPreview, setIsPreview] = useState<boolean>(false);

    // Clear existing images leaving page
    useEffect(() => {
        return () => {
            setImages((images) => {
                images.forEach((image) => URL.revokeObjectURL(image.previewUrl));
                return [];
            });
        };
    }, []);

    // Clear existing image when selected a new one
    useEffect(() => {
        return () => {
            if (coverImage) {
                URL.revokeObjectURL(coverImage.previewUrl);
            }
        };
    }, [coverImage]);

    const handleCoverImage = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const file = ev.target.files?.item(0);
        if (!file) return;
        setCoverImage({ file, previewUrl: URL.createObjectURL(file) });
    };

    const handleTextChange = (
        ev: React.ChangeEvent<HTMLTextAreaElement>,
        setTextState: React.Dispatch<React.SetStateAction<string>>
    ) => {
        const textarea = ev.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
        setTextState(textarea.value);
    };

    const handleTagChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const value = ev.target.value.trim();
        setTags((prevTags) => prevTags.map((tag, index) => (index === selectedTag ? value : tag)));
    };

    const handleTagKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
        const value = ev.currentTarget.value.trim();
        if (ev.key === 'Enter' && value && !tags.includes(value)) {
            setTags((prev) => [...prev, value]);
        }
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

            // Upload cover image if provided
            let coverImageUrl;
            if (coverImage) {
                uploadImagePromises.push(
                    (async () => {
                        const signedUrl = await getS3ImageUploadUrl.mutateAsync({
                            fileName: coverImage.file.name.replace(
                                /\.jpg$/,
                                `-${session.data?.user.id}-${Date.now()}.jpg`
                            ),
                            contentType: coverImage.file.type,
                        });
                        const response = await fetch(signedUrl, {
                            method: 'PUT',
                            body: coverImage.file,
                            headers: { 'Content-Type': coverImage.file.type },
                        });
                        coverImageUrl = response.url.split('?')[0];
                        if (!response.ok || !coverImageUrl) throw new Error('Image upload failed');

                        // Track signed URL for deletion in case of failure
                        signedUrls.push(signedUrl);
                    })() // Invoke the function immediately to get the promise
                );
            }

            // Wait for all image upload promises to resolve
            await Promise.all(uploadImagePromises);

            // Publish the article
            await publishArticle.mutateAsync({
                title,
                content: updatedContent,
                tags,
                imageUrl: coverImageUrl,
            });

            router.push('/');
        } catch {
            // In case of error, delete the uploaded images
            alert('error');
            await Promise.all(
                signedUrls.map(async (signedUrl) => {
                    await fetch(signedUrl, { method: 'DELETE' });
                })
            );
        }
    };

    return (
        <div className={cn('flex h-screen flex-col justify-between gap-2 py-2 md:w-full', className)}>
            <div className='flex h-10 justify-between'>
                <span className='my-auto font-medium'>Create Post</span>
                <div className='flex gap-2'>
                    <Button className='p-2' variant='type2' onClick={() => setIsPreview(false)}>
                        Edit
                    </Button>
                    <Button className='p-2' variant='type2' onClick={() => setIsPreview(true)}>
                        Preview
                    </Button>
                </div>
            </div>

            {isPreview ? (
                <div className='h-fit bg-base-1000 px-16 py-12 text-lg'>
                    <div className='mb-8 w-full break-words text-5xl font-extrabold leading-snug'>{title}</div>
                    <MarkdownWrapper className='prose'>{content}</MarkdownWrapper>
                </div>
            ) : (
                <div className='flex grow flex-col overflow-y-auto'>
                    {/* Title and Tags */}
                    <div className='space-y-10 bg-base-1000 px-12 py-8'>
                        {/* Cover Image Button */}
                        {coverImage ? (
                            <>
                                <Image
                                    className='inline'
                                    src={coverImage.previewUrl}
                                    alt='Article cover image'
                                    width='160' // go with md:full
                                    height='160'
                                />
                                <Button
                                    className='mx-4 h-10 px-4 py-3 hover:text-rose-700'
                                    variant='type10'
                                    onClick={() => setCoverImage(null)}
                                >
                                    Remove image
                                </Button>
                            </>
                        ) : null}
                        <UploadImageButton className='h-10 px-4 py-3' variant='type10' onInputChange={handleCoverImage}>
                            Set cover image
                        </UploadImageButton>
                        {/* Title Input */}
                        <Textarea
                            className='p-0 text-5xl font-extrabold leading-snug placeholder:text-base-700'
                            value={title}
                            onChange={(ev) => handleTextChange(ev, setTitle)}
                            placeholder='New post title here...'
                            rows={1}
                            autoFocus={selectedTag === null}
                        />
                        {/* Tags Input */}
                        <div className='mt-2 flex gap-2' onClick={() => setSelectedTag(null)}>
                            {tags.map((tag, index) =>
                                index === selectedTag ? (
                                    <Input
                                        key={index}
                                        className='px-0 focus-visible:ring-0'
                                        value={tag}
                                        onChange={handleTagChange}
                                        autoFocus
                                    />
                                ) : (
                                    <div key={index} className='flex gap-1 rounded-md bg-base-900 p-1 text-base-300'>
                                        <Button
                                            className='hover:cursor-text'
                                            onClick={(ev) => {
                                                ev.stopPropagation();
                                                setSelectedTag(index);
                                            }}
                                        >
                                            <div className='text-base-500'>#</div> {tag}
                                        </Button>
                                        <Button
                                            onClick={() => setTags(tags.filter((t) => t !== tag))}
                                            className='hover:text-red-500'
                                        >
                                            <X />
                                        </Button>
                                    </div>
                                )
                            )}
                            {tags.length < 4 ? (
                                <Input
                                    className='p-0 placeholder:text-base-600 focus-visible:ring-0'
                                    placeholder={tags.length ? 'Add another tag' : 'Add up to 4 tags'}
                                    onKeyDown={handleTagKeyDown}
                                />
                            ) : null}
                        </div>
                    </div>
                    {/* Toolbar */}
                    {/* <div className='flex items-center gap-1 border-x border-base-1000 bg-background px-12 py-2'>
                        {[Bold, Italic, Link, ListOrdered, List, Heading, Quote, Code, Square, Zap].map(
                            (Icon, index) => {
                                return (
                                    <Button key={index} size='icon' className='h-10 text-base-200' variant='type2'>
                                        <Icon className='h-6 w-6' strokeWidth='2' />
                                    </Button>
                                );
                            }
                        )}
                        <UploadImageButton
                            className='h-10 text-base-200'
                            variant='type2'
                            size='icon'
                            onChange={handleContentImage}
                        >
                            <ImageIcon className='h-6 w-6' strokeWidth='2' />
                        </UploadImageButton>
                    </div> */}
                    <Toolbar
                        className='border-x border-base-1000 bg-background px-12 py-2'
                        setContent={setContent}
                        setImages={setImages}
                    />
                    {/* Content Area */}
                    <div className='w-full grow bg-base-900'>
                        <Textarea
                            className='h-full rounded-t-none px-12 py-8 text-lg placeholder:text-base-600'
                            value={content}
                            onChange={(ev) => handleTextChange(ev, setContent)}
                            placeholder='Write something here...'
                        />
                    </div>
                </div>
            )}

            <div className='flex gap-2'>
                <Button variant='type6' size='md' onClick={handlePublish}>
                    Publish
                </Button>
                <Button variant='type2' size='md'>
                    Save Draft
                </Button>
                <Button
                    className='h-10 text-foreground hover:bg-brand-400/75 hover:text-brand-200'
                    variant='type2'
                    size='icon'
                >
                    <Bolt className='h-6 w-6' strokeWidth='2' />
                </Button>
                <Button className='text-sm' variant='type2' size='md'>
                    Revert New Changes
                </Button>
            </div>
        </div>
    );
};

export { Toolbar, Editor };
