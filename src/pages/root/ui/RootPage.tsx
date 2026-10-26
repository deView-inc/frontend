import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function RootPage() {
    const cookie = await cookies();
    const authStoreData = cookie.get('0auth');
    const isAuthorized = authStoreData?.value === 'true';

    if (!isAuthorized) {
        return redirect('/sign-in');
    }

    return redirect('/profile');
}
