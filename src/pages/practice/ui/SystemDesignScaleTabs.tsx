'use client';

import { useState } from 'react';

import { SegmentedItem, SystemDesignSegmented } from './SystemDesignSegmented';

type SystemScale = 'startup' | 'mid-scale' | 'enterprise';
type AnalysisFocus = 'latency' | 'consistency' | 'cost';

export function SystemDesignScaleTabs() {
    const [scale, setScale] = useState<SystemScale>('startup');
    const [focus, setFocus] = useState<AnalysisFocus>('latency');

    return (
        <div className="flex items-center gap-[26px]">
            <SystemDesignSegmented
                label="Масштаб системы"
                value={scale}
                onValueChange={setScale}
            >
                <SegmentedItem
                    className="!px-4 !py-1.5"
                    value="startup"
                >
                    Startup
                </SegmentedItem>
                <SegmentedItem
                    className="!px-4 !py-1.5"
                    value="mid-scale"
                >
                    Mid-scale
                </SegmentedItem>
                <SegmentedItem
                    className="!px-4 !py-1.5"
                    value="enterprise"
                >
                    Enterprise
                </SegmentedItem>
            </SystemDesignSegmented>
            <SystemDesignSegmented
                label="Фокус разбора"
                value={focus}
                onValueChange={setFocus}
            >
                <SegmentedItem
                    className="!px-4 !py-1.5"
                    value="latency"
                >
                    Латентность
                </SegmentedItem>
                <SegmentedItem
                    className="!px-4 !py-1.5"
                    value="consistency"
                >
                    Согласованность
                </SegmentedItem>
                <SegmentedItem
                    className="!px-4 !py-1.5"
                    value="cost"
                >
                    Стоимость
                </SegmentedItem>
            </SystemDesignSegmented>
        </div>
    );
}
