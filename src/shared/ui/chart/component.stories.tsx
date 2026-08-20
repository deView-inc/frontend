import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
    type ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from './component';

const chartData = [
    { desktop: 186, mobile: 80, month: 'January' },
    { desktop: 305, mobile: 200, month: 'February' },
    { desktop: 237, mobile: 120, month: 'March' },
    { desktop: 73, mobile: 190, month: 'April' },
    { desktop: 209, mobile: 130, month: 'May' },
    { desktop: 214, mobile: 140, month: 'June' },
];

const chartConfig = {
    desktop: { color: 'oklch(0.6 0.2 250)', label: 'Desktop' },
    mobile: { color: 'oklch(0.7 0.2 150)', label: 'Mobile' },
} satisfies ChartConfig;

const meta = {
    component: ChartContainer,
    tags: ['autodocs'],
    title: 'shared/ui/Chart',
} satisfies Meta<typeof ChartContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <ChartContainer
            config={chartConfig}
            className="min-h-52 w-[500px]"
        >
            <BarChart
                accessibilityLayer
                data={chartData}
            >
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar
                    dataKey="desktop"
                    fill="var(--color-desktop)"
                    radius={4}
                />
                <Bar
                    dataKey="mobile"
                    fill="var(--color-mobile)"
                    radius={4}
                />
            </BarChart>
        </ChartContainer>
    ),
};
