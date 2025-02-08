import Markdown from 'react-markdown';

import { cn } from '~/lib/utils';

const MarkdownWrapper = ({ className, children }: { className?: string; children: string }) => {
    return (
        <Markdown className={cn('prose-a:text-brand-600 prose-a:underline hover:prose-a:text-brand-800', className)}>
            {children}
        </Markdown>
    );
};

export { MarkdownWrapper };
