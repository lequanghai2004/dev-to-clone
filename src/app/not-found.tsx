import Link from 'next/link';

export default () => (
    <div className="flex h-screen flex-col items-center justify-center space-y-4 text-center">
        <h1 className="text-4xl font-bold text-red-600">404</h1>
        <p className="text-xl text-gray-600">Oops! The page you're looking for could not be found.</p>
        <Link
            className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-600 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            href="/"
        >
            Go back home
        </Link>
    </div>
);
