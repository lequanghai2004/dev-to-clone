'use client';

import { CommentIcon, LovePlusIcon } from '~/components/icons';
import { Button } from '~/components/ui/button';

const InteractionPanel = ({ reactionsCount, commentsCount }: { reactionsCount: number; commentsCount: number }) => {
    const handleReact = () => {
        console.log('Reacted!');
    };

    const handleComment = () => {
        console.log('Comment clicked!');
    };

    return (
        <div className='hidden w-16 flex-col gap-4 py-28 sm:flex'>
            {/* Reaction Button */}
            <Button
                className='flex aspect-square h-auto w-full flex-col gap-0 px-3 text-base-200 hover:text-red-500'
                onClick={handleReact}
            >
                <div className='flex aspect-square h-10 items-center justify-center'>
                    <LovePlusIcon />
                </div>
                <div className='mb-1 text-sm leading-none text-base-300'>{reactionsCount}</div>
            </Button>
            {/* Comment Button */}
            <Button
                className='flex aspect-square h-auto w-full flex-col gap-0 px-3 text-base-200 hover:text-yellow-500'
                onClick={handleComment}
            >
                <div className='flex aspect-square h-10 items-center justify-center'>
                    <CommentIcon />
                </div>
                <div className='mb-1 text-sm leading-none text-base-300'>{commentsCount}</div>
            </Button>
        </div>
    );
};

export default InteractionPanel;
