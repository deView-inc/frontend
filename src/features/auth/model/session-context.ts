'use client';

import { createContext, useContext } from 'react';

import type { AuthUser } from './types';

export type SessionStatus = 'anonymous' | 'authenticated' | 'loading';

export interface SessionContextValue {
    establishSession: (token: string) => Promise<void>;
    signOut: () => Promise<void>;
    status: SessionStatus;
    user: AuthUser | null;
}

export const SessionContext = createContext<SessionContextValue | null>(null);

export function useSession() {
    const context = useContext(SessionContext);

    if (!context) {
        throw new Error('useSession must be used within SessionProvider');
    }

    return context;
}
