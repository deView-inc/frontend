import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Badge } from './component';

const meta = {
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'secondary', 'outline', 'ghost', 'link', 'destructive'],
        },
    },
    args: {
        children: 'Badge',
    },
    component: Badge,
    tags: ['autodocs'],
    title: 'shared/ui/Badge',
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
    render: (args) => (
        <div className="flex flex-wrap items-center gap-2">
            <Badge
                {...args}
                variant="default"
            >
                Default
            </Badge>
            <Badge
                {...args}
                variant="secondary"
            >
                Secondary
            </Badge>
            <Badge
                {...args}
                variant="outline"
            >
                Outline
            </Badge>
            <Badge
                {...args}
                variant="ghost"
            >
                Ghost
            </Badge>
            <Badge
                {...args}
                variant="link"
            >
                Link
            </Badge>
            <Badge
                {...args}
                variant="destructive"
            >
                Destructive
            </Badge>
        </div>
    ),
};
