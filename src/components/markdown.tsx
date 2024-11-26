import Markdown from 'react-markdown';

const MarkdownWrapper = ({ className, children }: { className?: string; children: string }) => {
    return <Markdown className={className}>{children}</Markdown>;
};

export { MarkdownWrapper };
