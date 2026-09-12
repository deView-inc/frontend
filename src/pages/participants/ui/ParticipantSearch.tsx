import { type ChangeEvent, useCallback } from 'react';
import { Icon, Input } from '~&/shared/ui';

import type { ParticipantSearchProps } from '../lib/types';

export function ParticipantSearch({ query, setQuery }: ParticipantSearchProps) {
    const handleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value),
        [setQuery],
    );
    return (
        <div className="relative min-w-[220px] flex-1">
            <span className="text-muted-foreground pointer-events-none absolute top-1/2 left-[14px] z-10 size-4 -translate-y-1/2">
                <Icon
                    name="MagnifyingGlass"
                    aria-hidden="true"
                    className="size-4"
                />
            </span>
            <Input
                type="search"
                aria-label="Поиск по имени, стеку, описанию"
                placeholder="Поиск по имени, стеку, описанию..."
                value={query}
                onChange={handleChange}
                className="bg-card h-[42px] rounded-[3px] pr-3 pl-10 text-[13px]"
            />
        </div>
    );
}
