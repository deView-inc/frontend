import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import {
    Avatar,
    AvatarBadge,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
    AvatarImage,
} from './component';

const meta = {
    argTypes: {
        size: {
            control: 'inline-radio',
            options: ['sm', 'default', 'lg'],
        },
    },
    component: Avatar,
    tags: ['autodocs'],
    title: 'shared/ui/Avatar',
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => (
        <Avatar {...args}>
            <AvatarImage
                src="https://i.pravatar.cc/80?img=3"
                alt="User"
            />
            <AvatarFallback>JD</AvatarFallback>
        </Avatar>
    ),
};

export const Fallback: Story = {
    render: (args) => (
        <Avatar {...args}>
            <AvatarFallback>JD</AvatarFallback>
        </Avatar>
    ),
};

export const Sizes: Story = {
    render: () => (
        <div className="flex items-center gap-3">
            <Avatar size="sm">
                <AvatarFallback>SM</AvatarFallback>
            </Avatar>
            <Avatar size="default">
                <AvatarFallback>MD</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
                <AvatarFallback>LG</AvatarFallback>
            </Avatar>
        </div>
    ),
};

export const WithBadge: Story = {
    render: () => (
        <Avatar>
            <AvatarImage
                src="https://i.pravatar.cc/80?img=5"
                alt="User"
            />
            <AvatarFallback>JD</AvatarFallback>
            <AvatarBadge className="size-2.5 bg-green-500" />
        </Avatar>
    ),
};

export const Group: Story = {
    render: () => (
        <AvatarGroup>
            <Avatar>
                <AvatarImage
                    src="https://i.pravatar.cc/80?img=1"
                    alt="User 1"
                />
                <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <Avatar>
                <AvatarImage
                    src="https://i.pravatar.cc/80?img=2"
                    alt="User 2"
                />
                <AvatarFallback>B</AvatarFallback>
            </Avatar>
            <Avatar>
                <AvatarImage
                    src="https://i.pravatar.cc/80?img=3"
                    alt="User 3"
                />
                <AvatarFallback>C</AvatarFallback>
            </Avatar>
            <AvatarGroupCount>+5</AvatarGroupCount>
        </AvatarGroup>
    ),
};
