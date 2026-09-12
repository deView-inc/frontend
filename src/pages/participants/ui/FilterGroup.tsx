import { useCallback } from 'react';
import { cn } from '~&/shared/lib/utils';
import { Button } from '~&/shared/ui';

interface FilterGroupProps<Value extends string> {
    label: string;
    options: readonly Value[];
    value: Value | null;
    onChange: (value: Value | null) => void;
}

interface FilterOptionProps<Value extends string> {
    option: Value | null;
    selected: boolean;
    onChange: (value: Value | null) => void;
}

function FilterOption<Value extends string>({
    option,
    selected,
    onChange,
}: FilterOptionProps<Value>) {
    const handleClick = useCallback(() => onChange(option), [onChange, option]);

    return (
        <Button
            variant={selected ? 'primary' : 'outline'}
            size="sm"
            aria-pressed={selected}
            onClick={handleClick}
            className={cn(
                'h-8 rounded-[3px] px-[13px] text-xs',
                !selected && 'bg-card font-normal text-muted-foreground',
            )}
        >
            {option ?? 'Все'}
        </Button>
    );
}

export function FilterGroup<Value extends string>({
    label,
    options,
    value,
    onChange,
}: FilterGroupProps<Value>) {
    return (
        <div
            role="group"
            aria-label={label}
            className="flex flex-wrap items-center gap-1.5"
        >
            <span className="text-muted-foreground mr-1 font-mono text-[10px] tracking-[1px] uppercase">
                {label}
            </span>
            {[null, ...options].map((option) => (
                <FilterOption
                    key={option ?? 'all'}
                    option={option}
                    selected={value === option}
                    onChange={onChange}
                />
            ))}
        </div>
    );
}
