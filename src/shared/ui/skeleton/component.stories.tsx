import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Skeleton } from './component';

const meta = {
    component: Skeleton,
    tags: ['autodocs'],
    title: 'shared/ui/Skeleton',
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { className: 'h-4 w-40' },
};

export const Card: Story = {
    render: () => (
        <div className="flex items-center gap-3">
            <Skeleton className="size-10 rounded-full" />
            <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
            </div>
        </div>
    ),
};
