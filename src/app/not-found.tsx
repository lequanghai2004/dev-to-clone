import Link from 'next/link';
import { Button } from '~/components/ui/button';

const NotFoundFallback = () => {
    return (
        <div className='m-auto flex flex-col items-center justify-center space-y-4'>
            <div className='flex items-center gap-2 text-xl'>
                <span className='text-red-500'>404</span>
                <span className='text-primary'>Page not found</span>
            </div>
            <Button asChild>
                <Link className='text-base-900' href='/'>
                    Back to Home
                </Link>
            </Button>
        </div>
    );
};

export default NotFoundFallback;
