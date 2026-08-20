import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Button } from '../button';
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from './component';

const meta = {
    component: Empty,
    tags: ['autodocs'],
    title: 'shared/ui/Empty',
} satisfies Meta<typeof Empty>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => (
        <Empty
            {...args}
            className="w-96"
        >
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <MagnifyingGlassIcon />
                </EmptyMedia>
                <EmptyTitle>No results found</EmptyTitle>
                <EmptyDescription>Try adjusting your search or filters.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <Button size="sm">Clear filters</Button>
            </EmptyContent>
        </Empty>
    ),
};
