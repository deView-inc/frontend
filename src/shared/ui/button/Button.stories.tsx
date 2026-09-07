import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Button } from './component';

const meta = {
    title: 'UI/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'outline', 'ghost', 'link', 'destructive'],
        },
        size: {
            control: 'select',
            options: [
                'default',
                'medium',
                'large',
                'sm',
                'lg',
                'xs',
                'icon',
                'icon-sm',
                'icon-lg',
                'icon-xs',
            ],
        },
        disabled: { control: 'boolean' },
    },
    args: {
        children: 'Button',
        variant: 'primary',
        size: 'medium',
    },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
    args: { variant: 'secondary' },
};

export const Outline: Story = {
    args: { variant: 'outline' },
};

export const Ghost: Story = {
    args: { variant: 'ghost' },
};

export const Link: Story = {
    args: { variant: 'link' },
};

export const Destructive: Story = {
    args: { variant: 'destructive' },
};

export const Disabled: Story = {
    args: { disabled: true },
};

export const Variants: Story = {
    render: () => (
        <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="destructive">Destructive</Button>
        </div>
    ),
};

export const Sizes: Story = {
    render: () => (
        <div className="flex flex-wrap items-center gap-3">
            <Button size="xs">Extra small</Button>
            <Button size="sm">Small</Button>
            <Button size="medium">Medium</Button>
            <Button size="large">Large</Button>
        </div>
    ),
};
