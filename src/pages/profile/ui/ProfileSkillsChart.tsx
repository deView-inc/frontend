'use client';

import {
    Chart as ChartJS,
    Filler,
    LineElement,
    PointElement,
    RadialLinearScale,
    Tooltip,
    type ChartOptions,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { Card } from '~&/shared/ui';

import { getChartColor } from '../lib/get-chart-color';
import { profileMock } from '../lib/profile-mock';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

const RADAR_OPTIONS: ChartOptions<'radar'> = {
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            callbacks: {
                label: (context) => `Оценка: ${context.formattedValue}`,
            },
        },
    },
    responsive: true,
    scales: {
        r: {
            angleLines: {
                color: () => getChartColor('--border', 'rgba(128, 128, 128, 0.18)'),
            },
            grid: {
                color: () => getChartColor('--border', 'rgba(128, 128, 128, 0.18)'),
            },
            max: 10,
            min: 0,
            pointLabels: {
                color: () => getChartColor('--muted-foreground', '#8f8f8f'),
                font: {
                    size: 10,
                },
            },
            ticks: {
                display: false,
                stepSize: 2,
            },
        },
    },
};

export function ProfileSkillsChart() {
    const { skills } = profileMock;

    const data = {
        datasets: [
            {
                backgroundColor: () => getChartColor('--primary', 'rgb(184, 255, 0)'),
                borderColor: () => getChartColor('--primary', 'rgb(184, 255, 0)'),
                borderWidth: 1,
                fill: true,
                data: skills.map((skill) => skill.value),
                pointBackgroundColor: () => getChartColor('--primary', 'rgb(184, 255, 0)'),
                pointBorderColor: () => getChartColor('--primary', 'rgb(184, 255, 0)'),
                pointBorderWidth: 0,
                pointHoverRadius: 3.3,
                pointRadius: 3.3,
            },
        ],
        labels: skills.map((skill) => skill.label),
    };

    return (
        <Card className="gap-0 rounded-sm px-5 py-4">
            <h2 className="text-sm font-bold">Профиль навыков</h2>

            <p className="text-muted-foreground mt-0.5 text-[11px]">По всем интервью</p>

            <div className="mx-auto h-[209px] w-full max-w-[220px]">
                <Radar
                    data={data}
                    options={RADAR_OPTIONS}
                />
            </div>
        </Card>
    );
}
