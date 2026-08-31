import { cn } from '~&/shared/lib/utils';
import { Card } from '~&/shared/ui';
import { RADAR_SIZE } from '~&/widgets/practice-interview-modes/lib/radar-geometry';

type CompetencyKey =
    | 'leadership'
    | 'conflictResolution'
    | 'ownership'
    | 'communication'
    | 'reflection';

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

const SIZE = 220;
const CENTER = SIZE / 2;
const RADIUS = 80;

function pointOnAxis(index: number, total: number, value: number) {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const r = (RADIUS * value) / 100;
    return {
        x: CENTER + r * Math.cos(angle),
        y: CENTER + r * Math.sin(angle),
    };
}

function labelPoint(index: number, total: number) {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const r = RADIUS + 24;
    return {
        x: CENTER + r * Math.cos(angle),
        y: CENTER + r * Math.sin(angle),
    };
}

export const PracticeInterviewCompetencyRadar = ({ className, scores }: Props) => {
    const total = AXES_ORDER.length;
    const points = AXES_ORDER.map((key, i) => pointOnAxis(i, total, scores[key]));
    const polygon = points.map((p) => `${p.x},${p.y}`).join(' ');

    return (
        <Card className={cn('flex flex-col gap-1 rounded-md p-6', className)}>
            <h3 className="text-sm font-bold">Профиль компетенций</h3>
            <p className="text-muted-foreground mb-2 text-[13px]">По ответам в этой сессии</p>

            <svg
                viewBox={`0 0 ${RADAR_SIZE} ${RADAR_SIZE}`}
                className="mx-auto w-full max-w-[260px] overflow-visible"
            >
                {[25, 50, 75, 100].map((ring) => (
                    <polygon
                        key={ring}
                        points={AXES_ORDER.map((_, i) => {
                            const p = pointOnAxis(i, total, ring);
                            return `${p.x},${p.y}`;
                        }).join(' ')}
                        className="stroke-secondary fill-none"
                        strokeWidth={1}
                    />
                ))}

                {AXES_ORDER.map((_, i) => {
                    const p = pointOnAxis(i, total, 100);
                    return (
                        <line
                            key={i}
                            x1={RADAR_SIZE / 2}
                            y1={RADAR_SIZE / 2}
                            x2={p.x}
                            y2={p.y}
                            className="stroke-secondary"
                            strokeWidth={1}
                        />
                    );
                })}

                <polygon
                    points={polygon}
                    className="fill-primary stroke-primary"
                    strokeWidth={2}
                />

                {AXES_ORDER.map((key, i) => {
                    const p = labelPoint(i, total);
                    return (
                        <text
                            key={key}
                            x={p.x}
                            y={p.y}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="fill-muted-foreground text-[10px]"
                        >
                            {COMPETENCY_LABELS[key]}
                        </text>
                    );
                })}
            </svg>
        </Card>
    );
};
