'use client';
import * as React from 'react';

interface Ctx {
    open: boolean;
    setOpen: (v: boolean) => void;
    toggle: () => void;

    isVisible: boolean;
    setIsVisible: (v: boolean) => void;
}

const TaskPanelContext = React.createContext<Ctx | null>(null);

export function TaskPanelProvider({ children }: React.PropsWithChildren) {
    const [open, setOpen] = React.useState(true);
    const [isVisible, setIsVisible] = React.useState(true);

    const value = React.useMemo(
        () => ({
            open,
            setOpen,
            toggle: () => setOpen((v) => !v),
            isVisible,
            setIsVisible,
        }),
        [open, isVisible],
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
