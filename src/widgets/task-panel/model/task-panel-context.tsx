'use client';
import * as React from 'react';

interface Ctx {
    open: boolean;
    setOpen: (v: boolean) => void;
    toggle: () => void;
}
const TaskPanelContext = React.createContext<Ctx | null>(null);

export function TaskPanelProvider({ children }: React.PropsWithChildren) {
    const [open, setOpen] = React.useState(true); // На макете левая панель развёрнута по умолчанию

    const value = React.useMemo(
        () => ({ open, setOpen, toggle: () => setOpen((v) => !v) }),
        [open],
    );

    return <TaskPanelContext.Provider value={value}>{children}</TaskPanelContext.Provider>;
}

export function useTaskPanel() {
    const ctx = React.useContext(TaskPanelContext);
    if (!ctx) {
        throw new Error('useTaskPanel must be used within TaskPanelProvider');
    }
    return ctx;
}
