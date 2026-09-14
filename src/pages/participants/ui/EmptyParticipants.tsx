import { Button } from '~&/shared/ui';

import type { EmptyParticipantsProps } from '../lib/types';

export function EmptyParticipants({ resetFilters }: EmptyParticipantsProps) {
    return (
        <div className="bg-card rounded-[3px] border px-6 py-12 text-center">
            <h2 className="text-base font-semibold">Участники не найдены</h2>
            <p className="text-muted-foreground mt-2 text-sm">
                Попробуйте изменить запрос или сбросить фильтры.
            </p>
            <Button
                variant="outline"
                className="mt-5"
                onClick={resetFilters}
            >
                Сбросить фильтры
            </Button>
        </div>
    );
}
