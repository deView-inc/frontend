import {
    SidebarHeader as BaseSidebarHeader,
    Logo,
    SidebarMenu,
    SidebarMenuItem,
} from '~&/shared/ui';

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
