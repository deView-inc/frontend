import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Button } from './component';

const meta = {
    argTypes: {
        disabled: { control: 'boolean' },
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
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'outline', 'ghost', 'link', 'destructive'],
        },
    },
    args: {
        children: 'Button',
    },
    component: Button,
    tags: ['autodocs'],
    title: 'shared/ui/Button',
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: { variant: 'primary' },
};

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
    render: (args) => (
        <div className="flex flex-wrap items-center gap-3">
            <Button
                {...args}
                variant="primary"
            >
                Primary
            </Button>
            <Button
                {...args}
                variant="secondary"
            >
                Secondary
            </Button>
            <Button
                {...args}
                variant="outline"
            >
                Outline
            </Button>
            <Button
                {...args}
                variant="ghost"
            >
                Ghost
            </Button>
            <Button
                {...args}
                variant="link"
            >
                Link
            </Button>
            <Button
                {...args}
                variant="destructive"
            >
                Destructive
            </Button>
        </div>
    ),
};

export const Sizes: Story = {
    render: (args) => (
        <div className="flex flex-wrap items-center gap-3">
            <Button
                {...args}
                size="xs"
            >
                Extra small
            </Button>
            <Button
                {...args}
                size="sm"
            >
                Small
            </Button>
            <Button
                {...args}
                size="medium"
            >
                Medium
            </Button>
            <Button
                {...args}
                size="large"
            >
                Large
            </Button>
        </div>
    ),
};
