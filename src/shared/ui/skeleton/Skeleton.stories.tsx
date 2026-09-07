import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Skeleton } from './component';

const meta = {
    title: 'UI/Skeleton',
    component: Skeleton,
    tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { className: 'h-4 w-48' },
};

export const Card: Story = {
    render: () => (
        <div className="flex items-center gap-3">
            <Skeleton className="size-10 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-24" />
            </div>
        </div>
    ),
};
