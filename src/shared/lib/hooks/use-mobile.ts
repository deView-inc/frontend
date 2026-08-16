'use client';
// oxlint-disable no-undef
import * as React from 'react';

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
    const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

    const onChangeFn = React.useEffectEvent(() => {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    });

    React.useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

        mql.addEventListener('change', onChangeFn);

        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

        return () => mql.removeEventListener('change', onChangeFn);
    }, []);

    return Boolean(isMobile);
}
