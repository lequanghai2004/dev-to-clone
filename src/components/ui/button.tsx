import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/lib/utils';

const buttonVariants = cva(
    'inline-flex h-full items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
    {
        variants: {
            variant: {
                type0: 'text-bright-foreground bg-primary shadow hover:bg-primary/90 [&_svg]:size-4',
                type1: 'border border-brand-600 font-medium text-brand-600 hover:border-brand-800 hover:bg-brand-800 hover:text-foreground hover:underline',
                type2: 'text-base-200 hover:bg-brand-400/75 hover:text-brand-600',
                type3: 'text-lg hover:text-brand-800',
                type4: 'bg-base-1000 text-lg font-bold shadow-sm hover:text-brand-800',
                type5: 'hover:text-base-0 hover:bg-base-1000',
                type6: 'border border-input bg-brand-800 shadow-sm hover:bg-brand-700 hover:text-accent-foreground',
                type7: 'hover:text-base-0 hover:bg-base-900',
                type8: 'text-base-200 hover:bg-base-900 hover:text-base-100',
                type9: 'border border-transparent text-base-200 hover:border-base-800 hover:bg-base-900 hover:text-base-100',
                type10: 'border border-base-800 bg-base-900 bg-inherit text-base-200',
                type11: 'hover:text-brand-200',

                destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
                ghost: '',
                link: 'text-primary underline-offset-4 hover:underline',
            },
            size: {
                default: '',
                xs: 'px-2 py-1',
                sm: 'px-4 py-1',
                md: 'px-4 py-2',
                lg: 'px-8 font-medium',
                icon: 'aspect-square w-auto',
            },
        },
        defaultVariants: {
            variant: 'ghost',
            size: 'default',
        },
    }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';
        return <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />;
    }
);
Button.displayName = 'Button';

export { Button };
export type { ButtonProps };
