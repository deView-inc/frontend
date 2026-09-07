import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Badge } from './component';

const meta = {
    title: 'UI/Badge',
    component: Badge,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'secondary', 'outline', 'ghost', 'link', 'destructive'],
        },
    },
    args: {
        children: 'Badge',
        variant: 'default',
    },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Secondary: Story = {
    args: { variant: 'secondary' },
};

export const Outline: Story = {
    args: { variant: 'outline' },
};

export const Destructive: Story = {
    args: { variant: 'destructive' },
};

export const Variants: Story = {
    render: () => (
        <div className="flex flex-wrap items-center gap-2">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="ghost">Ghost</Badge>
            <Badge variant="link">Link</Badge>
            <Badge variant="destructive">Destructive</Badge>
        </div>
    ),
};
