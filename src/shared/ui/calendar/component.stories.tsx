import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

import { Calendar } from './component';

const meta = {
    component: Calendar,
    tags: ['autodocs'],
    title: 'shared/ui/Calendar',
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => {
        const [date, setDate] = useState<Date | undefined>(new Date());
        return (
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-lg border"
            />
        );
    },
};

export const WithDropdown: Story = {
    render: () => {
        const [date, setDate] = useState<Date | undefined>(new Date());
        return (
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                captionLayout="dropdown"
                className="rounded-lg border"
            />
        );
    },
};
