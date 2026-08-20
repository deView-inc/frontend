import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Switch } from './component';

const meta = {
    argTypes: {
        disabled: { control: 'boolean' },
        size: {
            control: 'inline-radio',
            options: ['sm', 'default'],
        },
    },
    component: Switch,
    tags: ['autodocs'],
    title: 'shared/ui/Switch',
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
    args: { defaultChecked: true },
};

export const Small: Story = {
    args: { defaultChecked: true, size: 'sm' },
};

export const Disabled: Story = {
    args: { disabled: true },
};

export const WithLabel: Story = {
    render: (args) => (
        <label className="flex items-center gap-2 text-sm">
            <Switch {...args} />
            Enable notifications
        </label>
    ),
};
