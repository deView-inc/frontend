'use client';

import * as React from 'react';
import type { PropsWithChildren } from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

export type SessionTab = 'chat' | 'notes';

interface Ctx {
    open: boolean;
    setOpen: (v: boolean) => void;
    toggle: () => void;
    tab: SessionTab;
    setTab: (t: SessionTab) => void;
    openTab: (t: SessionTab) => void;
}

const SessionPanelContext = createContext<Ctx | null>(null);

export function SessionPanelProvider({ children }: PropsWithChildren) {
    const [open, setOpen] = useState(true);
    const [tab, setTab] = useState<SessionTab>('chat');

    const toggle = useCallback(() => setOpen((v) => !v), []);
    const openTab = useCallback((t: SessionTab) => {
        setTab(t);
        setOpen(true);
    }, []);

    const value = useMemo(
        () => ({ open, setOpen, toggle, tab, setTab, openTab }),
        [open, tab, toggle, openTab],
    );

    return <SessionPanelContext.Provider value={value}>{children}</SessionPanelContext.Provider>;
}

export function useSessionPanel() {
    const ctx = useContext(SessionPanelContext);
    if (!ctx) {
        throw new Error('useSessionPanel must be used within SessionPanelProvider');
    }
    return ctx;
}
