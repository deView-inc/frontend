import type { ChartOptions } from 'chart.js';

export type CompetencyKey =
    | 'leadership'
    | 'conflictResolution'
    | 'ownership'
    | 'communication'
    | 'reflection';

export const RADAR_OPTIONS: ChartOptions<'radar'> = {
    layout: {
        padding: 24,
    },
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false },
        tooltip: {
            callbacks: {
                label: (ctx) => `${ctx.raw}`,
            },
        },
    },
    responsive: true,
    scales: {
        r: {
            angleLines: { color: 'rgba(255,255,255,0.1)' },
            grid: { color: 'rgba(255,255,255,0.1)' },
            max: 100,
            min: 0,
            pointLabels: {
                color: 'rgba(255,255,255,0.7)',
                font: { size: 12 },
            },
            ticks: { display: false, stepSize: 25 },
        },
    },
};

export function buildRadarData(
    axesOrder: CompetencyKey[],
    labels: Record<CompetencyKey, string>,
    scores: Record<CompetencyKey, number>,
) {
    return {
        datasets: [
            {
                backgroundColor: 'rgba(163, 230, 53, 0.5)',
                borderColor: 'rgb(163, 230, 53)',
                borderWidth: 2,
                data: axesOrder.map((key) => scores[key]),
                pointBackgroundColor: 'rgb(163, 230, 53)',
                pointRadius: 3,
            },
        ],
        labels: axesOrder.map((key) => labels[key]),
    };
}
