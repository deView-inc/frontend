import { cn } from '~&/shared/lib/utils';
import { Card } from '~&/shared/ui';

import { arenaMock } from '../lib/arena-mock';

export function ArenaTestCases() {
    const { testCases } = arenaMock;

    return (
        <Card className="h-full gap-0 rounded-sm p-[22px]">
            <h2 className="pb-4 text-[15px] font-bold">Тест-кейсы</h2>

            <div>
                {testCases.map((testCase) => {
                    const isPassed = testCase.result === 'pass';

                    const resultLabel = isPassed ? 'PASS' : `FAIL · ${testCase.error}`;

                    return (
                        <div
                            key={testCase.id}
                            className="flex items-center justify-between gap-6 py-2.5 sm:gap-24"
                        >
                            <code className="text-foreground min-w-0 overflow-x-auto font-mono text-xs whitespace-nowrap">
                                {testCase.input}
                            </code>

                            <span
                                className={cn(
                                    'shrink-0 font-mono text-xs font-bold',
                                    isPassed ? 'text-primary' : 'text-destructive',
                                )}
                            >
                                {resultLabel}
                            </span>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
}
