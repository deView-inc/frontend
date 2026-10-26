'use client';

import { type Route } from 'next';
import { usePathname, useRouter } from 'next/navigation';
import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { isApiError, refreshAccessToken } from '~&/shared/api';
import { ROUTES } from '~&/shared/config';
import {
    clearAuthCookie,
    setAccessToken,
    setAuthCookie,
    subscribeAccessToken,
} from '~&/shared/lib/session';

import { getCurrentUser, signOutRequest } from '../api/endpoints';
import { SessionContext, type SessionStatus } from '../model/session-context';
import type { AuthUser } from '../model/types';

interface Props {
    children: ReactNode;
}

function isAuthScreen(pathname: string | null) {
    return pathname === ROUTES.AUTH.SIGN_IN || pathname === ROUTES.AUTH.SIGN_UP;
}

function isPublicPath(pathname: string | null) {
    return (
        isAuthScreen(pathname) ||
        pathname === ROUTES.AUTH.OAUTH ||
        pathname === ROUTES.HELP.FAQ ||
        Boolean(pathname?.startsWith('/user/'))
    );
}

export function SessionProvider({ children }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const [status, setStatus] = useState<SessionStatus>('loading');
    const [user, setUser] = useState<AuthUser | null>(null);
    const statusRef = useRef(status);
    const establishingRef = useRef(false);
    const didBootstrap = useRef(false);

    useEffect(() => {
        statusRef.current = status;
    }, [status]);

    const markAnonymous = useCallback(() => {
        clearAuthCookie();
        setUser(null);
        setStatus('anonymous');
    }, []);

    const establishSession = useCallback(async (token: string) => {
        establishingRef.current = true;
        setAccessToken(token);
        setAuthCookie();

        try {
            const nextUser = await getCurrentUser();
            setUser(nextUser);
        } catch {
            setUser(null);
        } finally {
            establishingRef.current = false;
        }

        setStatus('authenticated');
    }, []);

    const signOut = useCallback(async () => {
        try {
            await signOutRequest();
        } catch {
            // Local session is cleared even if the request fails.
        }

        setAccessToken(null);
        markAnonymous();
        router.replace(ROUTES.AUTH.SIGN_IN as Route);
    }, [markAnonymous, router]);

    useEffect(() => {
        if (!pathname || pathname === ROUTES.AUTH.OAUTH || didBootstrap.current) {
            return;
        }

        didBootstrap.current = true;
        let cancelled = false;

        const isTaken = () => establishingRef.current || statusRef.current === 'authenticated';

        const bootstrap = async () => {
            try {
                const token = await refreshAccessToken();

                if (cancelled || isTaken()) {
                    return;
                }

                if (!token) {
                    markAnonymous();
                    return;
                }

                try {
                    const nextUser = await getCurrentUser();

                    if (cancelled || isTaken()) {
                        return;
                    }

                    setAuthCookie();
                    setUser(nextUser);
                    setStatus('authenticated');
                } catch (error) {
                    if (cancelled || isTaken()) {
                        return;
                    }

                    if (isApiError(error) && error.status === 401) {
                        setAccessToken(null);
                        markAnonymous();
                        return;
                    }

                    setAuthCookie();
                    setStatus('authenticated');
                }
            } catch {
                if (cancelled || isTaken()) {
                    return;
                }

                setAccessToken(null);
                markAnonymous();
            }
        };

        void bootstrap();

        return () => {
            cancelled = true;
        };
    }, [markAnonymous, pathname]);

    useEffect(
        () =>
            subscribeAccessToken((token) => {
                if (token || establishingRef.current || statusRef.current === 'loading') {
                    return;
                }

                markAnonymous();
            }),
        [markAnonymous],
    );

    useEffect(() => {
        if (status === 'loading' || !pathname) {
            return;
        }

        if (status === 'authenticated' && isAuthScreen(pathname)) {
            router.replace(ROUTES.PROFILE.ROOT as Route);
            return;
        }

        if (status === 'anonymous' && !isPublicPath(pathname)) {
            router.replace(ROUTES.AUTH.SIGN_IN as Route);
        }
    }, [pathname, router, status]);

    const value = useMemo(
        () => ({
            establishSession,
            signOut,
            status,
            user,
        }),
        [establishSession, signOut, status, user],
    );

    return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}
