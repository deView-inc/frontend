import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Textarea } from './component';

const meta = {
    title: 'UI/Textarea',
    component: Textarea,
    tags: ['autodocs'],
    argTypes: {
        disabled: { control: 'boolean' },
    },
    args: {
        placeholder: 'Введите сообщение…',
    },
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
    args: { defaultValue: 'Комментарий к собеседованию' },
};

export const Disabled: Story = {
    args: { disabled: true, defaultValue: 'Недоступно' },
};
