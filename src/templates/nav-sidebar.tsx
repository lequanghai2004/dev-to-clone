import Link from 'next/link';
import type Icon from '~/components/icons';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from '~/components/ui/sidebar';

const NavSidebar = ({
    className,
    data,
}: {
    className?: string;
    data: {
        title?: string;
        items: {
            title?: string;
            url: string;
            icon?: Icon;
        }[];
    }[];
}) => {
    return (
        <Sidebar className={className} side='left'>
            <SidebarContent>
                {data.map((block) => (
                    <SidebarGroup key={block.title}>
                        {block.title ? (
                            <SidebarGroupLabel className='text-base'>{block.title}</SidebarGroupLabel>
                        ) : null}
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {block.items.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton variant='primary' size='xl' asChild>
                                                <Link href={item.url}>
                                                    <div>{Icon ? <Icon /> : null}</div>
                                                    {item.title}
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
        </Sidebar>
    );
};

export default NavSidebar;
