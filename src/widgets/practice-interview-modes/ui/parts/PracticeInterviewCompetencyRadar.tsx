'use client';

import {
    Chart as ChartJS,
    Filler,
    LineElement,
    PointElement,
    RadialLinearScale,
    Tooltip,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { cn } from '~&/shared/lib/utils';
import { Card } from '~&/shared/ui';
import type { CompetencyKey } from '~&/widgets/practice-interview-modes/lib/radar-config';
import {
    RADAR_OPTIONS,
    buildRadarData,
} from '~&/widgets/practice-interview-modes/lib/radar-config';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

const COMPETENCY_LABELS: Record<CompetencyKey, string> = {
    communication: 'Коммуникация',
    conflictResolution: 'Конфликты',
    leadership: 'Лидерство',
    ownership: 'Ownership',
    reflection: 'Рефлексия',
};

const AXES_ORDER: CompetencyKey[] = [
    'leadership',
    'conflictResolution',
    'ownership',
    'communication',
    'reflection',
];

interface Props {
    className?: string;
    scores: Record<CompetencyKey, number>;
}

export const PracticeInterviewCompetencyRadar = ({ className, scores }: Props) => {
    const data = buildRadarData(AXES_ORDER, COMPETENCY_LABELS, scores);
    const chartKey = AXES_ORDER.map((key) => scores[key]).join('-');

    return (
        <Card className={cn('flex flex-col gap-1 rounded-md p-6', className)}>
            <h3 className="text-sm font-bold">Профиль компетенций</h3>
            <p className="text-muted-foreground mb-2 text-[13px]">По ответам в этой сессии</p>

            <div className="mx-auto h-[300px] w-full max-w-[360px]">
                <Radar
                    key={chartKey}
                    data={data}
                    options={RADAR_OPTIONS}
                />
            </div>
        </Card>
    );
};
