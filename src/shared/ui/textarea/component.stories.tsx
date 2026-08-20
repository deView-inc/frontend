import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Textarea } from './component';

const meta = {
    argTypes: {
        disabled: { control: 'boolean' },
    },
    args: {
        placeholder: 'Type your message...',
    },
    component: Textarea,
    tags: ['autodocs'],
    title: 'shared/ui/Textarea',
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
    args: { defaultValue: 'Disabled textarea', disabled: true },
};

export const Invalid: Story = {
    args: { 'aria-invalid': true, defaultValue: 'Invalid value' },
};
