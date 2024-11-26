'use client';
import { useState } from 'react';

import { Button } from '~/components/ui/button';
import { MeatballsMenuIcon } from '~/components/icons';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

import NewsFeed from '~/templates/newsfeed';
import SearchBar from '~/templates/searchbar';
import { trpc } from '~/trpc/client';

const Content = ({ className }: { className?: string }) => {
    const [activeButton, setActiveButton] = useState<'discover' | 'following'>('discover');
    const data = trpc.article.getLatest.useQuery().data?.data?.articles ?? [];

    return (
        <div className={className}>
            <div className='h-14 rounded-md bg-base-1000 p-2'>
                <SearchBar placeholder="What's on your mind?" />
            </div>
            <div className='flex h-9 justify-between'>
                <div>
                    <Button
                        variant={activeButton === 'discover' ? 'type4' : 'type3'}
                        onClick={() => setActiveButton('discover')}
                        size='sm'
                    >
                        Discover
                    </Button>
                    <Button
                        variant={activeButton === 'following' ? 'type4' : 'type3'}
                        onClick={() => setActiveButton('following')}
                        size='sm'
                    >
                        Following
                    </Button>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className='text-base-200 hover:bg-base-1000 hover:text-foreground' size='icon'>
                            <MeatballsMenuIcon />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='w-64 bg-base-1000 p-0' align='end'>
                        <DropdownMenuLabel className='text-bright-foreground p-2 text-base hover:text-brand-700'>
                            Relevant
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className='m-1 bg-base-800 pt-px' />
                        <DropdownMenuGroup>
                            <DropdownMenuItem className='text-bright-foreground rounded-md p-2 font-normal hover:bg-background hover:text-brand-700'>
                                Top this Week
                            </DropdownMenuItem>
                            <DropdownMenuItem className='text-bright-foreground rounded-md p-2 font-normal hover:bg-background hover:text-brand-700'>
                                Top this Month
                            </DropdownMenuItem>
                            <DropdownMenuItem className='text-bright-foreground rounded-md p-2 font-normal hover:bg-background hover:text-brand-700'>
                                Top this Year
                            </DropdownMenuItem>
                            <DropdownMenuItem className='text-bright-foreground rounded-md p-2 font-normal hover:bg-background hover:text-brand-700'>
                                Top this Infinity
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator className='m-1 bg-base-800 pt-px' />
                        <DropdownMenuItem className='text-bright-foreground rounded-md p-2 font-normal hover:bg-background hover:text-brand-700'>
                            Latest
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <NewsFeed data={data} showCommentsByDefault />
        </div>
    );
};

export default Content;
