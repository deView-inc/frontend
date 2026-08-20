import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Spinner } from './component';

const meta = {
    component: Spinner,
    tags: ['autodocs'],
    title: 'shared/ui/Spinner',
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Large: Story = {
    args: { className: 'size-8' },
};

export const Sizes: Story = {
    render: () => (
        <div className="flex items-center gap-4">
            <Spinner className="size-4" />
            <Spinner className="size-6" />
            <Spinner className="size-8" />
        </div>
    ),
};
