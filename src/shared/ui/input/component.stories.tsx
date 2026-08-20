import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Input } from './component';

const meta = {
    argTypes: {
        disabled: { control: 'boolean' },
        type: {
            control: 'select',
            options: ['text', 'email', 'password', 'number', 'search'],
        },
    },
    args: {
        placeholder: 'Type something...',
    },
    component: Input,
    tags: ['autodocs'],
    title: 'shared/ui/Input',
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Email: Story = {
    args: { placeholder: 'you@example.com', type: 'email' },
};

export const Password: Story = {
    args: { placeholder: '••••••••', type: 'password' },
};

export const Disabled: Story = {
    args: { disabled: true, value: 'Disabled' },
};

export const Invalid: Story = {
    args: { 'aria-invalid': true, value: 'Invalid value' },
};
