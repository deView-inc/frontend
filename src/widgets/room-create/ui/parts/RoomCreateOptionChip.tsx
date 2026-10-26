import { type ComponentProps } from 'react';
import { cn } from '~&/shared/lib/utils';
import { Button } from '~&/shared/ui';

export function RoomCreateOptionChip({
    selected,
    className,
    ...props
}: ComponentProps<typeof Button> & { selected?: boolean }) {
    return (
        <Button
            type="button"
            size="sm"
            variant={selected ? 'primary' : 'outline'}
            aria-pressed={selected}
            className={cn('rounded', className)}
            {...props}
        />
    );
}
