import { RocketIcon } from '@phosphor-icons/react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ContentCard } from './component';

const meta = {
    argTypes: {
        layout: {
            control: 'inline-radio',
            options: ['feature', 'panel', 'stat'],
        },
    },
    component: ContentCard,
    tags: ['autodocs'],
    title: 'shared/ui/ContentCard',
} satisfies Meta<typeof ContentCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Panel: Story = {
    args: {
        action: { label: 'View all' },
        layout: 'panel',
        title: 'Recent activity',
    },
    render: (args) => (
        <div className="w-96">
            <ContentCard {...args}>
                <p className="text-muted-foreground mt-3 text-sm">Panel content goes here.</p>
            </ContentCard>
        </div>
    ),
};

export const Feature: Story = {
    args: {
        icon: <RocketIcon className="text-primary size-6" />,
        layout: 'feature',
        title: 'Fast feedback',
    },
    render: (args) => (
        <div className="w-96">
            <ContentCard {...args}>
                <p className="text-muted-foreground text-sm">
                    Get instant feedback on your interview performance.
                </p>
            </ContentCard>
        </div>
    ),
};

export const Stat: Story = {
    args: {
        layout: 'stat',
        title: 'Total sessions',
    },
    render: (args) => (
        <div className="w-96">
            <ContentCard {...args}>
                <span className="text-2xl font-semibold">128</span>
            </ContentCard>
        </div>
    ),
};
