import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

const SearchBar = ({
    className,
    placeholder = 'Search...',
    areaLabel,
    LeftIcon,
    RightIcon,
}: {
    className?: string;
    placeholder?: string;
    areaLabel?: string;
    LeftIcon?: React.ComponentType;
    RightIcon?: React.ComponentType;
}) => {
    return (
        <div
            className={cn(
                'flex h-full rounded-md border border-base-700 bg-background focus-within:ring-2 focus-within:ring-brand-600 hover:border-base-600',
                className
            )}
        >
            {LeftIcon ? (
                <Button variant='type2' size='icon'>
                    <LeftIcon />
                </Button>
            ) : null}
            <Input
                className='h-full px-2 text-foreground placeholder-base-700'
                variant='square'
                type='text'
                placeholder={placeholder}
                area-label={areaLabel}
            />
            {RightIcon ? (
                <Button className='h-full hover:bg-brand-400/75' size='icon'>
                    <RightIcon />
                </Button>
            ) : null}
        </div>
    );
};

export default SearchBar;
