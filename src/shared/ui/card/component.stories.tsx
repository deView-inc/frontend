import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from '~&/shared/ui/button';

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from './component';

const meta = {
    argTypes: {
        size: {
            control: 'inline-radio',
            options: ['default', 'sm'],
        },
    },
    component: Card,
    tags: ['autodocs'],
    title: 'shared/ui/Card',
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => (
        <Card
            {...args}
            className="w-80"
        >
            <CardHeader>
                <CardTitle>Card title</CardTitle>
                <CardDescription>Card description goes here.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>This is the card content area with some example text.</p>
            </CardContent>
            <CardFooter>
                <Button size="sm">Action</Button>
            </CardFooter>
        </Card>
    ),
};

export const WithAction: Story = {
    render: (args) => (
        <Card
            {...args}
            className="w-80"
        >
            <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>You have 3 unread messages.</CardDescription>
                <CardAction>
                    <Button
                        variant="ghost"
                        size="icon-sm"
                    >
                        ×
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <p>Manage your notification preferences here.</p>
            </CardContent>
        </Card>
    ),
};

export const Small: Story = {
    args: { size: 'sm' },
    render: (args) => (
        <Card
            {...args}
            className="w-72"
        >
            <CardHeader>
                <CardTitle>Compact card</CardTitle>
                <CardDescription>Using the sm size variant.</CardDescription>
            </CardHeader>
            <CardContent>Small spacing content.</CardContent>
        </Card>
    ),
};
