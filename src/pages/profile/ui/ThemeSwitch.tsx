'use client';

import { type Theme, useTheme } from '~&/shared/lib/theme';
import { Icon, type PhosphorIconName, Segmented, SegmentedItem } from '~&/shared/ui';

const THEME_OPTIONS: { value: Theme; label: string; icon: PhosphorIconName }[] = [
    { icon: 'Sun', label: 'Светлая', value: 'light' },
    { icon: 'Moon', label: 'Тёмная', value: 'dark' },
    { icon: 'Desktop', label: 'Системная', value: 'system' },
];

export function ThemeSwitch() {
    const { setTheme, theme } = useTheme();

    return (
        <Segmented
            variant="buttons"
            value={theme}
            onValueChange={setTheme}
        >
            {THEME_OPTIONS.map(({ icon, label, value }) => (
                <SegmentedItem
                    key={value}
                    value={value}
                >
                    <Icon
                        name={icon}
                        size={18}
                    />
                    {label}
                </SegmentedItem>
            ))}
        </Segmented>
    );
}
