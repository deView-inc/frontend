'use client';

import * as React from 'react';

export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'theme';

interface ThemeContextValue {
    theme: Theme;
    resolvedTheme: ResolvedTheme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

const themeListeners = new Set<() => void>();

function isTheme(value: unknown): value is Theme {
    return value === 'light' || value === 'dark' || value === 'system';
}

function emitThemeChange() {
    for (const listener of themeListeners) {
        listener();
    }
}

function subscribeTheme(onStoreChange: () => void) {
    themeListeners.add(onStoreChange);
    window.addEventListener('storage', onStoreChange);

    return () => {
        themeListeners.delete(onStoreChange);
        window.removeEventListener('storage', onStoreChange);
    };
}

function getThemeSnapshot(): Theme {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);

    return isTheme(stored) ? stored : 'system';
}

function subscribeSystemTheme(onStoreChange: () => void) {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');

    mql.addEventListener('change', onStoreChange);

    return () => mql.removeEventListener('change', onStoreChange);
}

function getSystemThemeSnapshot(): ResolvedTheme {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({ children }: React.PropsWithChildren) {
    const theme = React.useSyncExternalStore(
        subscribeTheme,
        getThemeSnapshot,
        () => 'system' as Theme,
    );

    const systemTheme = React.useSyncExternalStore(
        subscribeSystemTheme,
        getSystemThemeSnapshot,
        () => 'light' as ResolvedTheme,
    );

    const resolvedTheme: ResolvedTheme = theme === 'system' ? systemTheme : theme;

    React.useEffect(() => {
        const root = document.documentElement;

        root.classList.toggle('dark', resolvedTheme === 'dark');
        root.style.colorScheme = resolvedTheme;
    }, [resolvedTheme]);

    const setTheme = React.useCallback((next: Theme) => {
        localStorage.setItem(THEME_STORAGE_KEY, next);
        emitThemeChange();
    }, []);

    const value = React.useMemo<ThemeContextValue>(
        () => ({ resolvedTheme, setTheme, theme }),
        [resolvedTheme, setTheme, theme],
    );

    return <ThemeContext value={value}>{children}</ThemeContext>;
}

export function useTheme() {
    const context = React.useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context;
}
