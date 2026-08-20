import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Kbd, KbdGroup } from './component';

const meta = {
    args: {
        children: 'K',
    },
    component: Kbd,
    tags: ['autodocs'],
    title: 'shared/ui/Kbd',
} satisfies Meta<typeof Kbd>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Group: Story = {
    render: () => (
        <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
        </KbdGroup>
    ),
};

export const Shortcuts: Story = {
    render: () => (
        <div className="flex flex-col gap-2 text-sm">
            <KbdGroup>
                <Kbd>Ctrl</Kbd>
                <Kbd>C</Kbd>
            </KbdGroup>
            <KbdGroup>
                <Kbd>Ctrl</Kbd>
                <Kbd>V</Kbd>
            </KbdGroup>
        </div>
    ),
};
