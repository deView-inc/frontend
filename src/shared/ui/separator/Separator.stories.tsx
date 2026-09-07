import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Separator } from './component';

const meta = {
    title: 'UI/Separator',
    component: Separator,
    tags: ['autodocs'],
    argTypes: {
        orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    },
} satisfies Meta<typeof Separator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
    render: () => (
        <div className="w-64">
            <p className="text-sm">Профиль</p>
            <Separator className="my-3" />
            <p className="text-sm">Настройки</p>
        </div>
    ),
};

export const Vertical: Story = {
    render: () => (
        <div className="flex h-6 items-center gap-3 text-sm">
            <span>Главная</span>
            <Separator orientation="vertical" />
            <span>История</span>
            <Separator orientation="vertical" />
            <span>Лидеры</span>
        </div>
    ),
};
