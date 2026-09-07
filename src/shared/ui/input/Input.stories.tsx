import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Input } from './component';

const meta = {
    title: 'UI/Input',
    component: Input,
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: 'select',
            options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
        },
        disabled: { control: 'boolean' },
    },
    args: {
        placeholder: 'Введите текст…',
        type: 'text',
    },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
    args: { defaultValue: 'deView' },
};

export const Password: Story = {
    args: { type: 'password', placeholder: '••••••••' },
};

export const Disabled: Story = {
    args: { disabled: true, defaultValue: 'Недоступно' },
};

export const Invalid: Story = {
    args: { 'aria-invalid': true, defaultValue: 'Ошибка' },
};
