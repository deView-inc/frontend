'use client';

import { Tabs, TabsList, TabsTrigger } from '~&/shared/ui';

export interface PracticeInterviewTabsOption {
    value: string;
    label: string;
}

interface PracticeInterviewTabsGroupProps {
    title: string;
    description?: string;
    options: readonly PracticeInterviewTabsOption[];
    value: string;
    onValueChange: (value: string) => void;
    className?: string;
}

export function PracticeInterviewTabsGroup({
    title,
    description,
    options,
    value,
    onValueChange,
    className,
}: PracticeInterviewTabsGroupProps) {
    return (
        <section className={className}>
            <h2 className="text-foreground text-sm font-semibold">{title}</h2>

            <Tabs
                value={value}
                onValueChange={onValueChange}
                className="mt-2"
            >
                <TabsList variant="buttons">
                    {options.map((option) => (
                        <TabsTrigger
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>

            {description && (
                <p className="text-muted-foreground mt-2 text-xs leading-relaxed">{description}</p>
            )}
        </section>
    );
}
