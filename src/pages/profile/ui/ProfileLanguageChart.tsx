'use client';

import {
    ArcElement,
    Chart as ChartJS,
    Tooltip,
    type ChartData,
    type ChartOptions,
    type ScriptableContext,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Card } from '~&/shared/ui';

import { getChartColor } from '../lib/get-chart-color';
import { profileMock } from '../lib/profile-mock';

ChartJS.register(ArcElement, Tooltip);

const DOUGHNUT_OPTIONS: ChartOptions<'doughnut'> = {
    cutout: '68%',
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            callbacks: {
                label: (context) => `${context.label}: ${context.formattedValue}%`,
            },
        },
    },
    responsive: true,
};

function getLanguageColor(label: string) {
    switch (label) {
        case 'JavaScript':
            return getChartColor('--primary', 'rgb(184, 255, 0)');

        case 'TypeScript':
            return '#89ddff';

        case 'Go':
            return getChartColor('--foreground-light', '#c792ea');

        default:
            return '#3d3d3d';
    }
}

export function ProfileLanguageChart() {
    const { languageDistribution, stats } = profileMock;

    const data: ChartData<'doughnut'> = {
        datasets: [
            {
                backgroundColor: (context: ScriptableContext<'doughnut'>) => {
                    const item = languageDistribution[context.dataIndex];

                    return getLanguageColor(item.label);
                },
                borderColor: () => getChartColor('--card', 'rgb(16, 18, 21)'),
                borderWidth: 3,
                data: languageDistribution.map((item) => item.value),
                hoverOffset: 0,
            },
        ],
        labels: languageDistribution.map((item) => item.label),
    };

    return (
        <Card className="h-full gap-4 rounded-sm p-5">
            <header>
                <h2 className="text-[13px] font-bold">По языкам</h2>

                <p className="text-muted-foreground mt-0.5 text-[11.5px]">
                    Всего {stats.interviewsCount} интервью
                </p>
            </header>

            <div className="flex items-center gap-[18px]">
                <div className="size-24 shrink-0">
                    <Doughnut
                        data={data}
                        options={DOUGHNUT_OPTIONS}
                    />
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-[9px]">
                    {languageDistribution.map((item) => (
                        <div
                            key={item.label}
                            className="flex items-center gap-2"
                        >
                            <span
                                aria-hidden
                                className="size-2 shrink-0 rounded-[2px]"
                                style={{
                                    backgroundColor: getLanguageColor(item.label),
                                }}
                            />

                            <span className="text-muted-foreground text-xs">{item.label}</span>

                            <strong className="ml-auto text-xs">{item.value}%</strong>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
}
