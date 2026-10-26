'use client';

import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    LinearScale,
    Tooltip,
    type ChartData,
    type ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Card } from '~&/shared/ui';

import { getChartColor } from '../lib/get-chart-color';
import { profileMock } from '../lib/profile-mock';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const BAR_OPTIONS: ChartOptions<'bar'> = {
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            callbacks: {
                label: (context) => `Сессий: ${context.formattedValue}`,
            },
        },
    },
    responsive: true,
    scales: {
        x: {
            border: {
                display: false,
            },
            grid: {
                display: false,
            },
            ticks: {
                color: () => getChartColor('--muted-foreground', '#6b6b6b'),
                font: {
                    family: 'JetBrains Mono',
                    size: 10,
                },
            },
        },
        y: {
            beginAtZero: true,
            display: false,
            suggestedMax: 6,
        },
    },
};

export function ProfileWeeklySessions() {
    const { weeklySessions } = profileMock;
    const lastIndex = weeklySessions.length - 1;

    const data: ChartData<'bar'> = {
        datasets: [
            {
                backgroundColor: (context) =>
                    context.dataIndex === lastIndex
                        ? getChartColor('--primary', 'rgb(184, 255, 0)')
                        : getChartColor('--muted', 'rgb(32, 32, 32)'),
                barPercentage: 0.7,
                borderRadius: 2,
                borderSkipped: false,
                categoryPercentage: 0.8,
                data: [...weeklySessions],
            },
        ],
        labels: weeklySessions.map(String),
    };

    return (
        <Card className="h-full gap-4 rounded-sm p-5">
            <header>
                <h2 className="text-[13px] font-bold">Сессии в неделю</h2>

                <p className="text-muted-foreground mt-0.5 text-[11.5px]">Последние 8 недель</p>
            </header>

            <div className="h-[130px] w-full">
                <Bar
                    data={data}
                    options={BAR_OPTIONS}
                />
            </div>
        </Card>
    );
}
