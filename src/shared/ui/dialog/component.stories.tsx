import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Button } from '../button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './component';

const meta = {
    component: Dialog,
    tags: ['autodocs'],
    title: 'shared/ui/Dialog',
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <Dialog>
            <DialogTrigger render={<Button>Open dialog</Button>} />
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your data.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose render={<Button variant="outline">Cancel</Button>} />
                    <DialogClose render={<Button variant="destructive">Delete</Button>} />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    ),
};
