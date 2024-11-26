import { useRef } from 'react';
import { Button, type ButtonProps } from '~/components/ui/button';
import { Input, type InputProps } from '~/components/ui/input';

const UploadImageButton = ({
    className,
    children,
    variant = 'type0',
    onInputChange,
    multiple = false,
    ...props
}: ButtonProps & { onInputChange: InputProps['onChange']; multiple?: InputProps['multiple'] }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <Button className={className} variant={variant} onClick={() => fileInputRef.current?.click()} {...props}>
            <Input
                ref={fileInputRef}
                type='file'
                accept='image/*'
                className='hidden'
                onChange={onInputChange}
                multiple={multiple}
            />
            {children}
        </Button>
    );
};

export default UploadImageButton;
