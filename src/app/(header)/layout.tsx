import Header from './header';

const HeaderLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
    <div className='w-full'>
        <Header />
        <div className='m-auto max-w-display p-4'>{children}</div>
    </div>
);

export default HeaderLayout;
