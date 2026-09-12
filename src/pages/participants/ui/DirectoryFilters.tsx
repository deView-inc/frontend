import type { DirectoryFiltersProps } from '../lib/types';
import { LEVEL_FILTERS, ROLE_FILTERS, STACK_FILTERS } from '../model/participants';
import { FilterGroup } from './FilterGroup';

export function DirectoryFilters({
    stack,
    setStack,
    level,
    setLevel,
    role,
    setRole,
}: DirectoryFiltersProps) {
    return (
        <div className="mb-[22px] flex flex-col gap-[14px]">
            <FilterGroup
                label="Стек"
                options={STACK_FILTERS}
                value={stack}
                onChange={setStack}
            />
            <div className="flex flex-wrap items-center gap-x-[14px] gap-y-3">
                <FilterGroup
                    label="Уровень"
                    options={LEVEL_FILTERS}
                    value={level}
                    onChange={setLevel}
                />
                <span
                    aria-hidden="true"
                    className="hidden h-4 border-l @min-[620px]:block"
                />
                <FilterGroup
                    label="Роль"
                    options={ROLE_FILTERS}
                    value={role}
                    onChange={setRole}
                />
            </div>
        </div>
    );
}
