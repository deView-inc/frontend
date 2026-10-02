'use client';
import * as React from 'react';

type Tab = 'chat' | 'notes';
const SessionTabContext = React.createContext<{ tab: Tab; setTab: (t: Tab) => void } | null>(null);

export function SessionTabsProvider({ children }: React.PropsWithChildren) {
    const [tab, setTab] = React.useState<Tab>('chat');
    return (
        <SessionTabContext.Provider value={{ tab, setTab }}>{children}</SessionTabContext.Provider>
    );
}

export function useSessionTab() {
    const ctx = React.useContext(SessionTabContext);
    if (!ctx) {
        throw new Error('useSessionTab must be used within SessionTabsProvider');
    }
    return ctx;
}
