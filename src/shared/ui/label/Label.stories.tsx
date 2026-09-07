import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Label } from './component';

const meta = {
    title: 'UI/Label',
    component: Label,
    tags: ['autodocs'],
    args: {
        children: 'Email',
    },
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
