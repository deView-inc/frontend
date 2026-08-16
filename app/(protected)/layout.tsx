import { cookies } from 'next/headers';
import { SidebarLayout } from '~&/app/layouts/SidebarLayout';
import { SIDEBAR_COOKIE_NAME } from '~&/shared/ui';

export default async function ProtectedLayout({ children }: React.PropsWithChildren) {
    const cookiesData = await cookies();

    const stateDataSidebar = cookiesData.get(SIDEBAR_COOKIE_NAME);
    const isOpened = stateDataSidebar?.value === 'true';

    return <SidebarLayout defaultOpen={isOpened ?? true}>{children}</SidebarLayout>;
}
