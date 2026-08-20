import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Separator } from './component';

const meta = {
    argTypes: {
        orientation: {
            control: 'inline-radio',
            options: ['horizontal', 'vertical'],
        },
    },
    component: Separator,
    tags: ['autodocs'],
    title: 'shared/ui/Separator',
} satisfies Meta<typeof Separator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
    render: (args) => (
        <div className="w-64">
            <p className="text-sm">Above</p>
            <Separator
                {...args}
                className="my-3"
            />
            <p className="text-sm">Below</p>
        </div>
    ),
};

export const Vertical: Story = {
    args: { orientation: 'vertical' },
    render: (args) => (
        <div className="flex h-8 items-center gap-3 text-sm">
            <span>Item 1</span>
            <Separator {...args} />
            <span>Item 2</span>
            <Separator {...args} />
            <span>Item 3</span>
        </div>
    ),
};
