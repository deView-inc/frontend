// ~&/widgets/task-panel/ui/task-panel.tsx
'use client';

import { ListChecksIcon, CaretDoubleLeftIcon, CaretDoubleRightIcon } from '@phosphor-icons/react';
import { cn } from '~&/shared/lib/utils';
import { useSidebar } from '~&/shared/ui';

interface TestCase {
    input: string;
    output: string;
}

interface Task {
    title: string;
    meta: string; // "Junior · JavaScript · 25 мин"
    description: string;
    tests: TestCase[];
}

// TODO: заменить на данные с бэка (по roomId)
const MOCK_TASK: Task = {
    title: 'Пара с заданной суммой',
    meta: 'Junior · JavaScript · 25 мин',
    description:
        'Дан массив целых чисел и число target. Вернуть индексы двух чисел, дающих в сумме target. Ожидается решение за один проход.',
    tests: [
        { input: '[2,7,11,15], 9', output: '[0,1]' },
        { input: '[3,2,4], 6', output: '[1,2]' },
    ],
};

export function TaskPanel({ task = MOCK_TASK }: { task?: Task }) {
    const { state, toggleSidebar } = useSidebar();
    const collapsed = state === 'collapsed';

    return (
        <div className="bg-background flex h-full flex-col">
            <div className="border-border flex h-[55px] shrink-0 items-center border-b px-4">
                {!collapsed && (
                    <div className="flex items-center gap-2">
                        <ListChecksIcon size={16} />
                        <span className="text-foreground text-[13.5px] font-semibold">Кодовая</span>
                    </div>
                )}
                <button
                    onClick={toggleSidebar}
                    className={cn(
                        'grid size-[26px] place-items-center rounded-lg border border-border',
                        !collapsed && 'ml-auto',
                    )}
                >
                    {collapsed ? (
                        <CaretDoubleRightIcon size={13} />
                    ) : (
                        <CaretDoubleLeftIcon size={13} />
                    )}
                </button>
            </div>

            {!collapsed && (
                <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
                    <h3 className="text-foreground text-[15px] font-semibold">{task.title}</h3>
                    <p className="text-foreground-muted font-mono text-[10.5px]">{task.meta}</p>
                    <p className="text-[13.5px] leading-[21.9px] text-[#c4cad1]">
                        {task.description}
                    </p>

                    <div className="flex flex-col gap-1.5">
                        <span className="text-foreground-muted font-mono text-[11px] tracking-[0.66px] uppercase">
                            Тесты
                        </span>
                        {task.tests.map((t, i) => (
                            <div
                                key={i}
                                className="border-border bg-card rounded-[9px] border px-[11px] py-[9px] font-mono text-[12px] text-[#c4cad1]"
                            >
                                {t.input} → {t.output}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
