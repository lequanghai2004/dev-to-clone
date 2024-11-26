import Link from 'next/link';

import { Button } from '~/components/ui/button';
import { BellIcon, SearchIcon } from '~/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import Logo from '~/components/logo';

import SearchBar from '~/templates/searchbar';
import DropdownMenuWrapper from '~/templates/dropdown';

import { profileDropdownActions } from './constants';
import { auth } from '~/server/auth/root';

const Header = async () => {
    const session = await auth();

    return (
        <div className='sticky top-0 z-50 h-14 w-full select-none border-b border-background bg-base-1000'>
            <div className='mx-auto flex h-full max-w-display justify-between px-4 py-2'>
                <div className='flex basis-1/2 gap-x-4'>
                    <Logo className='flex-none' />
                    <SearchBar className='grow' placeholder='Search ...' LeftIcon={SearchIcon} />
                </div>
                <div className='mr-4 flex h-full gap-x-3'>
                    {session ? (
                        <>
                            <Button variant='type1' size='md' asChild>
                                <Link href='/compose'>Create Post</Link>
                            </Button>
                            <Button variant='type2' size='icon'>
                                <BellIcon />
                            </Button>
                            <DropdownMenuWrapper
                                className='hover:underline'
                                label={
                                    <Link href={'/' + session.user.id}>
                                        <div className='text-bright-foreground text-base'>{session.user.name}</div>
                                        <div className='font-normal text-base-400'>
                                            @user-{session.user.id.slice(0, 15)}
                                        </div>
                                    </Link>
                                }
                                data={profileDropdownActions}
                            >
                                <div className='flex aspect-square h-full w-auto items-center justify-center'>
                                    <Avatar>
                                        <AvatarImage src='https://github.com/shadnotcn.png' />
                                        <AvatarFallback className='bg-green-500 font-medium text-foreground'>
                                            H
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                            </DropdownMenuWrapper>
                        </>
                    ) : (
                        <Button variant='type1' size='md' asChild>
                            <Link href='/api/auth/signin'>Log In</Link>
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
