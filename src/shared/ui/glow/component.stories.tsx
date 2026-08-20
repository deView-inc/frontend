import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Glow } from './component';

const meta = {
    argTypes: {
        blur: { control: { max: 200, min: 0, type: 'range' } },
        color: { control: 'color' },
        opacity: { control: { max: 1, min: 0, step: 0.05, type: 'range' } },
    },
    component: Glow,
    tags: ['autodocs'],
    title: 'shared/ui/Glow',
} satisfies Meta<typeof Glow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        blur: 80,
        color: 'oklch(0.7 0.2 150)',
        opacity: 0.4,
        width: 300,
    },
    render: (args) => (
        <div className="border-border bg-background relative flex h-80 w-80 items-center justify-center overflow-hidden rounded-xl border">
            <Glow
                {...args}
                className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
            <span className="relative z-10 text-sm">Glow effect</span>
        </div>
    ),
};
