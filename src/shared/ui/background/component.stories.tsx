import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Background } from './component';

const meta = {
    component: Background,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    title: 'shared/ui/Background',
} satisfies Meta<typeof Background>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <div className="relative min-h-96 w-full overflow-hidden">
            <Background />
            <div className="relative z-10 flex min-h-96 items-center justify-center">
                <span className="text-sm">Content over background</span>
            </div>
        </div>
    ),
};
