import type { Route } from 'next';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { NAV_ITEMS } from '~&/shared/config';
import {
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
    Icon,
    type PhosphorIconName,
} from '~&/shared/ui';

export function GlobalSearchList() {
    const router = useRouter();

    const handleSelect = React.useCallback(
        (path: Route) => {
            router.push(path);
        },
        [router],
    );

    const navItemsData = React.useMemo(
        () =>
            NAV_ITEMS.filter(
                (item): item is typeof item & { path: Route } =>
                    typeof item.label === 'string' && typeof item.path === 'string',
            ),
        [],
    );

    return (
        <CommandList>
            <CommandEmpty>Ничего не найдено!</CommandEmpty>
            <CommandGroup heading="Доступные страницы">
                {navItemsData.map((nav) => (
                    <GlobalSearchResult
                        key={`command-link-${nav.path}`}
                        {...nav}
                        label={nav.label as string}
                        onSelect={handleSelect}
                    />
                ))}
            </CommandGroup>
        </CommandList>
    );
}

interface GlobalSearchResultProps {
    icon?: PhosphorIconName | null;
    label: string;
    path: Route;
    onSelect: (path: Route) => void;
}

function GlobalSearchResult({ label, path, icon, onSelect }: GlobalSearchResultProps) {
    const handleSelect = React.useCallback(() => {
        onSelect(path);
    }, [onSelect, path]);

    return (
        <CommandItem onSelect={handleSelect}>
            {icon && (
                <Icon
                    name={icon}
                    className="text-muted-foreground size-3.5"
                />
            )}
            <span>{label}</span>
        </CommandItem>
    );
}
