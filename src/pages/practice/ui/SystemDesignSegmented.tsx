'use client';

import type { ReactNode } from 'react';
import { Segmented, SegmentedItem } from '~&/shared/ui';

interface SystemDesignSegmentedProps<Value extends string> {
    children: ReactNode;
    label: string;
    onValueChange: (value: Value) => void;
    value: Value;
}

export function SystemDesignSegmented<Value extends string>({
    children,
    label,
    onValueChange,
    value,
}: SystemDesignSegmentedProps<Value>) {
    return (
        <div className="flex items-center gap-2.5">
            <span className="font-mono text-[10px] leading-[14px] tracking-[0.08em] text-[#525963] uppercase">
                {label}
            </span>
            <Segmented
                variant="outlined"
                className="!gap-1 !p-0"
                value={value}
                onValueChange={onValueChange}
            >
                {children}
            </Segmented>
        </div>
    );
}

export { SegmentedItem };
