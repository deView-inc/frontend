import { Logo } from '~&/shared/ui/logo';
import {
    SidebarHeader as BaseSidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
} from '~&/shared/ui/sidebar';

import { CreateSessionButton } from './CreateSessionButton';

export function SidebarHeader() {
    return (
        <BaseSidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <Logo size="md" />
                </SidebarMenuItem>
            </SidebarMenu>
            <CreateSessionButton />
        </BaseSidebarHeader>
    );
}
