'use client';
import * as React from 'react';

interface Ctx {
    open: boolean;
    setOpen: (v: boolean) => void;
    toggle: () => void;
}
const SessionPanelContext = React.createContext<Ctx | null>(null);

export function SessionPanelProvider({ children }: React.PropsWithChildren) {
    const [open, setOpen] = React.useState(true);

    const value = React.useMemo(
        () => ({ open, setOpen, toggle: () => setOpen((v) => !v) }),
        [open],
    );

    return <SessionPanelContext.Provider value={value}>{children}</SessionPanelContext.Provider>;
}

export function useSessionPanel() {
    const ctx = React.useContext(SessionPanelContext);
    if (!ctx) {
        throw new Error('useSessionPanel must be used within SessionPanelProvider');
    }
    return ctx;
}
