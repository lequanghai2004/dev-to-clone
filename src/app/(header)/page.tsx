import NavSidebar from '~/templates/nav-sidebar';
import InfoSidebar from '~/templates/info-sidebar';

import { leftSidebarActions } from './constants';
import Content from './content';

const HomePage = async () => {
    // const hello = await trpc.post.hello({ text: 'from tRPC' });
    // const session = await auth();

    // if (session?.user) {
    //     void trpc.post.getLatest.prefetch();
    // }

    return (
        <div className='flex gap-3'>
            <NavSidebar className='min-w-60' data={leftSidebarActions} />
            <Content className='flex basis-full flex-col gap-2' />
            <InfoSidebar className='min-w-60 basis-1/2' />
        </div>
    );
};

export default HomePage;
