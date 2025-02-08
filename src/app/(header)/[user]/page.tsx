import { notFound } from 'next/navigation';

import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader } from '~/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { MeatballsMenuIcon, LocationIcon, CakeIcon, RedirectIcon } from '~/components/icons';

import NewsFeed from '~/templates/newsfeed';
import InfoSidebar from '~/templates/info-sidebar';
import DropdownMenuWrapper from '~/templates/dropdown';

import { trpc } from '~/trpc/server';
import { auth } from '~/server/auth/root';

const ProfilePage = async ({ params }: { params: Promise<{ user: string }> }) => {
    const session = await auth();
    const userResponse = await params;

    const userId = userResponse.user;
    const getUserResponse = await trpc.user.getById({ id: userId });
    const user = getUserResponse.data.user;
    if (!getUserResponse.success || !user) notFound();
    const isMe = userId == session?.user.id;
    let { name, color, image, biography, location, createdAt, github, linkedin, website, education, pronouns, work } =
        user;

    // Dummy data for UI demonstration and testing
    name = name;
    color = color;
    image = image;
    biography = biography;
    createdAt = createdAt;
    pronouns ??= 'Mr.';
    work ??= 'DevOps at Bosch';
    education ??= 'Swinburne University of Technology';
    github ??= 'https://github.com/LeQuangHai204';
    linkedin ??= 'https://www.linkedin.com/in/lequanghai204/';
    website ??= 'https://www.linkedin.com/in/lequanghai204/';
    location ??= 'Ho Chi Minh, Vietnam';

    const getArticlesResponse = await trpc.article.getByUser({ userId: userId });
    const articles = getArticlesResponse.success ? (getArticlesResponse.data.articles ?? []) : [];

    return (
        <div className='select-none'>
            <div
                className='flex h-32 w-full items-center justify-center'
                style={{ backgroundColor: color ?? 'orange' }}
            >
                <Avatar className='z-10 h-28 w-28 border-4' style={{ borderColor: color ?? 'orange' }}>
                    <AvatarImage alt='' src={image ?? '/placeholder.svg?height=128&width=128'} />
                    <AvatarFallback>DEV</AvatarFallback>
                </Avatar>
            </div>
            <div className='relative -top-16 mx-auto flex max-w-profile flex-col'>
                <Card className='mb-4 rounded-t-none bg-base-1000 lg:rounded-t-xl'>
                    <CardHeader className='mt-4'>
                        <div className='flex h-10 justify-end gap-x-2'>
                            {isMe ? (
                                <Button variant='type6' size='md'>
                                    Edit Profile
                                </Button>
                            ) : (
                                <>
                                    <Button variant='type6' size='md'>
                                        Follow
                                    </Button>
                                    <DropdownMenuWrapper
                                        data={[
                                            [
                                                {
                                                    title: `Block @${name}`,
                                                    url: '/block',
                                                },
                                                {
                                                    title: 'Report Abuse',
                                                    url: '/report',
                                                },
                                            ],
                                        ]}
                                    >
                                        <Button
                                            className='text-base-400 hover:bg-base-900 hover:text-foreground'
                                            size='icon'
                                            variant='type7'
                                        >
                                            <MeatballsMenuIcon />
                                        </Button>
                                    </DropdownMenuWrapper>
                                </>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className='p-0'>
                        <div className='text-center text-3xl font-bold text-white'>{name}</div>
                        {biography ? (
                            <div className='mx-auto mt-2 max-w-3xl text-center text-foreground'>{biography}</div>
                        ) : null}
                        <div className='flex flex-wrap justify-center p-4'>
                            {location ? (
                                <Button className='px-3 py-1 text-sm text-base-400 hover:text-brand-200'>
                                    <LocationIcon />
                                    {location}
                                </Button>
                            ) : null}
                            <Button className='px-3 py-1 text-sm text-base-400 hover:text-brand-200'>
                                <CakeIcon />
                                Joined on
                                {' ' +
                                    new Date(createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                    })}
                            </Button>
                            {website ? (
                                <Button className='px-3 py-1 text-sm text-base-400 hover:text-brand-200'>
                                    <RedirectIcon />
                                    {website}
                                </Button>
                            ) : null}
                        </div>
                        <div className='flex justify-evenly border-t p-6'>
                            {education ? (
                                <div className=''>
                                    <div className='text-center text-sm text-base-400'>Education</div>
                                    <div className='text-base-0 text-center'>{education}</div>
                                </div>
                            ) : null}
                            {pronouns ? (
                                <div className=''>
                                    <div className='text-center text-sm text-base-400'>Pronouns</div>
                                    <div className='text-base-0 text-center'>{pronouns}</div>
                                </div>
                            ) : null}
                            <div className=''>
                                <div className='text-center text-sm text-base-400'>Work</div>
                                <div className='text-base-0 text-center'>{work}</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className='flex w-full gap-x-4'>
                    <InfoSidebar className='basis-1/3' />
                    <NewsFeed data={articles} />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
