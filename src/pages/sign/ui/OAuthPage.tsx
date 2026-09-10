import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Spinner } from '~&/shared/ui';

import { OAuthCallbackScreen } from './OAuthCallbackScreen';

export const metadataOAuth: Metadata = {
    robots: {
        follow: false,
        index: false,
    },
    title: 'OAuth',
};

export function OAuthPage() {
    return (
        <Suspense
            fallback={
                <div className="border-border bg-card flex w-full max-w-[420px] flex-col items-center rounded-2xl border p-8">
                    <Spinner className="size-6" />
                </div>
            }
        >
            <OAuthCallbackScreen />
        </Suspense>
    );
}
