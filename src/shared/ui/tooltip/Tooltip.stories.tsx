import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Button } from '../button/component';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './component';

const meta = {
    title: 'UI/Tooltip',
    component: Tooltip,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <TooltipProvider>
                <Story />
            </TooltipProvider>
        ),
    ],
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <Tooltip>
            <TooltipTrigger render={<Button variant="outline">Наведи на меня</Button>} />
            <TooltipContent>Подсказка появляется здесь</TooltipContent>
        </Tooltip>
    ),
};
