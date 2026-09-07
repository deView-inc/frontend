import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Label } from '../label/component';
import { Switch } from './component';

const meta = {
    title: 'UI/Switch',
    component: Switch,
    tags: ['autodocs'],
    argTypes: {
        size: { control: 'inline-radio', options: ['sm', 'default'] },
        disabled: { control: 'boolean' },
    },
    args: {
        size: 'default',
    },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
    args: { defaultChecked: true },
};

export const Small: Story = {
    args: { size: 'sm', defaultChecked: true },
};

export const Disabled: Story = {
    args: { disabled: true },
};

export const WithLabel: Story = {
    render: (args) => (
        <Label className="cursor-pointer">
            <Switch {...args} />
            Уведомления
        </Label>
    ),
};
