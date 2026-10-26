'use client';

import {
    CategoryScale,
    Chart as ChartJS,
    Filler,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
    type ChartOptions,
    type ChartData,
    type ScriptableContext,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Card } from '~&/shared/ui';

import { getChartColor } from '../lib/get-chart-color';
import { profileMock } from '../lib/profile-mock';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

const getPrimaryColor = () => getChartColor('--primary', 'rgb(184, 255, 0)');

const getCardColor = () => getChartColor('--card', 'rgb(16, 18, 21)');

const getFillColor = () => getChartColor('--primary-foreground', 'rgb(64, 89, 0)');

function createScoreGradient(context: ScriptableContext<'line'>) {
    const { chartArea, ctx } = context.chart;

    if (!chartArea) {
        return getFillColor();
    }

    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);

    gradient.addColorStop(0, getFillColor());
    gradient.addColorStop(1, 'transparent');

    return gradient;
}

const LINE_OPTIONS: ChartOptions<'line'> = {
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            callbacks: {
                label: (context) => `Средний балл: ${context.formattedValue}`,
            },
        },
    },
    responsive: true,
    scales: {
        x: {
            display: false,
        },
        y: {
            border: {
                display: false,
            },
            grid: {
                color: (context) => {
                    const isOuterLine = context.index === 0 || context.index === 4;

                    return isOuterLine
                        ? 'transparent'
                        : getChartColor('--border', 'rgba(128, 128, 128, 0.18)');
                },
                drawTicks: false,
            },
            max: 5,
            min: 3,
            ticks: {
                count: 5,
                display: false,
            },
        },
    },
};

export function ProfileScoreTrend() {
    const { scoreTrend } = profileMock;
    const lastIndex = scoreTrend.length - 1;
    const isLastPoint = (context: ScriptableContext<'line'>) => context.dataIndex === lastIndex;

    const getPointRadius = (context: ScriptableContext<'line'>) => (isLastPoint(context) ? 5 : 4);

    const currentScore = scoreTrend[lastIndex].value;

    const data: ChartData<'line'> = {
        datasets: [
            {
                backgroundColor: createScoreGradient,
                borderColor: getPrimaryColor,
                borderWidth: 2,
                data: scoreTrend.map((item) => item.value),
                fill: true,
                pointBackgroundColor: (context) =>
                    isLastPoint(context) ? getPrimaryColor() : getCardColor(),
                pointBorderColor: getPrimaryColor,
                pointBorderWidth: 2,
                pointHoverRadius: getPointRadius,
                pointRadius: getPointRadius,
                tension: 0,
            },
        ],
        labels: scoreTrend.map((item) => item.label),
    };

    return (
        <Card className="gap-3 rounded-sm p-5">
            <header className="flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-[13px] font-bold">Динамика оценки</h2>

                    <p className="text-muted-foreground mt-0.5 text-[11.5px]">
                        Средний балл по сессиям
                    </p>
                </div>

                <span className="text-primary text-xl font-extrabold">{currentScore}</span>
            </header>

            <div className="h-[110px] w-full">
                <Line
                    data={data}
                    options={LINE_OPTIONS}
                />
            </div>

            <div className="text-muted-foreground flex justify-between font-mono text-[10.5px]">
                {scoreTrend.map((item) => (
                    <span key={item.label}>{item.label}</span>
                ))}
            </div>
        </Card>
    );
}
