const LoadingFallback = () => {
    return (
        <div className='flex h-screen w-screen items-center justify-center bg-background text-2xl'>
            <span className='h-8 w-8 animate-spin rounded-[50%] border-4 border-b-purple-600 border-t-purple-600'></span>
            <span className='ml-4 text-base-400'>Loading ...</span>
        </div>
    );
};

export default LoadingFallback;
// loading.tsx only replace page.tsx while loading
// the layout.tsx and other wrapper components remains interative !
