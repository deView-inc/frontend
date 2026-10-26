import { Title } from '~&/shared/ui';

import { arenaMock } from '../lib/arena-mock';

export function ArenaHeader() {
    const { task, match } = arenaMock;

    return (
        <header className="flex flex-col gap-3 pb-3 sm:flex-row sm:items-start sm:justify-between sm:gap-24">
            <div>
                <Title className="text-[26px] leading-normal font-extrabold tracking-[-0.26px]">
                    Coding Arena · 1×1 дуэль
                </Title>

                <p className="text-muted-foreground mt-1.5 text-sm">
                    {task.name} · {task.level}
                </p>
            </div>

            <span className="border-primary bg-primary text-primary-foreground inline-flex shrink-0 items-center gap-1.5 self-start rounded-sm border px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap">
                <span
                    aria-hidden
                    className="bg-primary-foreground size-1.5 shrink-0 rounded-full"
                />
                <span className="-translate-y-px">{match.statusLabel}</span>
            </span>
        </header>
    );
}
