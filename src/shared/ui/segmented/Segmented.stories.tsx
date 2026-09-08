import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

import { Segmented, SegmentedItem } from './component';

const meta = {
    title: 'UI/Segmented',
    component: Segmented,
    tags: ['autodocs'],
} satisfies Meta<typeof Segmented>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Outlined: Story = {
    render: () => {
        const [value, setValue] = useState('mid-scale');

        return (
            <Segmented
                variant="outlined"
                value={value}
                onValueChange={setValue}
            >
                <SegmentedItem value="startup">Startup</SegmentedItem>
                <SegmentedItem value="mid-scale">Mid-scale</SegmentedItem>
                <SegmentedItem value="enterprise">Enterprise</SegmentedItem>
            </Segmented>
        );
    },
};

export const Buttons: Story = {
    render: () => {
        const [value, setValue] = useState('light');

        return (
            <Segmented
                variant="buttons"
                value={value}
                onValueChange={setValue}
            >
                <SegmentedItem value="light">Светлая</SegmentedItem>
                <SegmentedItem value="dark">Тёмная</SegmentedItem>
                <SegmentedItem value="system">Системная</SegmentedItem>
            </Segmented>
        );
    },
};
