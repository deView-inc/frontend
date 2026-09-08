'use client';

import { useCallback } from 'react';
import { type Theme, useTheme } from '~&/shared/lib/theme';
import { Icon, type PhosphorIconName, Tabs, TabsList, TabsTrigger } from '~&/shared/ui';

const THEME_OPTIONS: { value: Theme; label: string; icon: PhosphorIconName }[] = [
    { icon: 'Sun', label: 'Светлая', value: 'light' },
    { icon: 'Moon', label: 'Тёмная', value: 'dark' },
    { icon: 'Desktop', label: 'Системная', value: 'system' },
];

export function ThemeSwitch() {
    const { setTheme, theme } = useTheme();

    const onValueChangeFn = useCallback((value: string) => setTheme(value as Theme), [setTheme]);

    return (
        <Tabs
            value={theme}
            onValueChange={onValueChangeFn}
        >
            <TabsList variant="buttons">
                {THEME_OPTIONS.map(({ icon, label, value }) => (
                    <TabsTrigger
                        key={value}
                        value={value}
                    >
                        <Icon
                            name={icon}
                            size={18}
                        />
                        {label}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    );
}
