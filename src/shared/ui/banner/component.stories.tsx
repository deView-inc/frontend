import { RocketIcon } from '@phosphor-icons/react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Banner } from './component';

const meta = {
    argTypes: {
        color: { control: 'color' },
    },
    args: {
        buttonLabel: 'Get started',
        description: 'Practice technical interviews with confidence.',
        showArrow: true,
        title: 'Welcome to deView',
    },
    component: Banner,
    tags: ['autodocs'],
    title: 'shared/ui/Banner',
} satisfies Meta<typeof Banner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => (
        <div className="w-[560px]">
            <Banner {...args} />
        </div>
    ),
};

export const WithIcon: Story = {
    render: (args) => (
        <div className="w-[560px]">
            <Banner
                {...args}
                icon={<RocketIcon className="text-primary size-5" />}
                iconBackgroundColor="bg-primary/10"
            />
        </div>
    ),
};

export const Colored: Story = {
    render: (args) => (
        <div className="w-[560px]">
            <Banner
                {...args}
                color="oklch(0.7 0.2 150 / 0.4)"
            />
        </div>
    ),
};
