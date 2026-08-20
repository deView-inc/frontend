import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Logo } from './component';

const meta = {
    argTypes: {
        size: {
            control: 'inline-radio',
            options: ['sm', 'md', 'lg'],
        },
    },
    component: Logo,
    tags: ['autodocs'],
    title: 'shared/ui/Logo',
} satisfies Meta<typeof Logo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
    render: () => (
        <div className="flex items-center gap-6">
            <Logo size="sm" />
            <Logo size="md" />
            <Logo size="lg" />
        </div>
    ),
};
