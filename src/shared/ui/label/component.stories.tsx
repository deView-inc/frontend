import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Label } from './component';

const meta = {
    args: {
        children: 'Label text',
    },
    component: Label,
    tags: ['autodocs'],
    title: 'shared/ui/Label',
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithInput: Story = {
    render: () => (
        <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="border-input h-8 rounded-lg border bg-transparent px-2.5 text-sm outline-none"
            />
        </div>
    ),
};
