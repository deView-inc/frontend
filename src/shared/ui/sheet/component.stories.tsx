import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Button } from '../button';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from './component';

const meta = {
    component: Sheet,
    tags: ['autodocs'],
    title: 'shared/ui/Sheet',
} satisfies Meta<typeof Sheet>;

export default meta;

type Story = StoryObj<typeof meta>;

const renderSheet = (side: 'top' | 'right' | 'bottom' | 'left') => (
    <Sheet>
        <SheetTrigger render={<Button variant="outline">Open {side}</Button>} />
        <SheetContent side={side}>
            <SheetHeader>
                <SheetTitle>Sheet title</SheetTitle>
                <SheetDescription>Sheet description content goes here.</SheetDescription>
            </SheetHeader>
            <SheetFooter>
                <SheetClose render={<Button>Save</Button>} />
            </SheetFooter>
        </SheetContent>
    </Sheet>
);

export const Right: Story = {
    render: () => renderSheet('right'),
};

export const Left: Story = {
    render: () => renderSheet('left'),
};

export const Top: Story = {
    render: () => renderSheet('top'),
};

export const Bottom: Story = {
    render: () => renderSheet('bottom'),
};
