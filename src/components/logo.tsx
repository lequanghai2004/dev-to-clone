import Link from 'next/link';
import Image from 'next/image';

const Logo = ({ className }: { className?: string }) => (
    <Link className={className} href='/'>
        <Image height={40} width={50} src='/logo.png' priority placeholder='empty' alt='DEV Community' />
    </Link>
);

export default Logo;
