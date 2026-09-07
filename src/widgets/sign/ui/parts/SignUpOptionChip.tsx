import type { ReactNode } from 'react';
import { cn } from '~&/shared/lib/utils';

interface Props {
    children: ReactNode;
    disabled?: boolean;
    onClick: () => void;
    selected: boolean;
}

export function SignUpOptionChip({ children, disabled, onClick, selected }: Props) {
    return (
        <button
            className={cn(
                'rounded-lg border px-3 py-2 text-left text-sm transition-opacity',
                selected
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border text-foreground',
                disabled && !selected && 'cursor-not-allowed opacity-40',
            )}
            disabled={disabled && !selected}
            onClick={onClick}
            type="button"
        >
            {children}
        </button>
    );
}
