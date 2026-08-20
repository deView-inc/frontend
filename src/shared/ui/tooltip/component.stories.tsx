import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from '~&/shared/ui/button';
import { Kbd } from '~&/shared/ui/kbd';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './component';

const meta = {
    component: Tooltip,
    decorators: [
        (Story) => (
            <TooltipProvider>
                <div className="flex justify-center p-16">
                    <Story />
                </div>
            </TooltipProvider>
        ),
    ],
    tags: ['autodocs'],
    title: 'shared/ui/Tooltip',
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <Tooltip>
            <TooltipTrigger render={<Button variant="outline">Hover me</Button>} />
            <TooltipContent>Helpful tooltip text</TooltipContent>
        </Tooltip>
    ),
};

export const Sides: Story = {
    render: () => (
        <div className="flex gap-4">
            {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
                <Tooltip key={side}>
                    <TooltipTrigger render={<Button variant="outline">{side}</Button>} />
                    <TooltipContent side={side}>Tooltip on {side}</TooltipContent>
                </Tooltip>
            ))}
        </div>
    ),
};

export const WithKbd: Story = {
    render: () => (
        <Tooltip>
            <TooltipTrigger render={<Button variant="outline">Search</Button>} />
            <TooltipContent>
                Open search
                <Kbd>⌘K</Kbd>
            </TooltipContent>
        </Tooltip>
    ),
};
