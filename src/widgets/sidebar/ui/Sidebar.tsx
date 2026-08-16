import {
    Sidebar as BaseSidebar,
    SidebarContent,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuItem,
    SidebarRail,
} from '~&/shared/ui';

import { SidebarHeader } from './SidebarHeader';
import { SidebarMenuLinks } from './SidebarMenuLinks';
import { DropdownUser } from './SidebarUser';

export function Sidebar() {
    return (
        <BaseSidebar collapsible="icon">
            <SidebarHeader />
            <SidebarContent>
                <SidebarMenuLinks />
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownUser />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </BaseSidebar>
    );
}
