import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from './component';

const meta = {
    title: 'UI/Avatar',
    component: Avatar,
    tags: ['autodocs'],
    argTypes: {
        size: { control: 'inline-radio', options: ['sm', 'default', 'lg'] },
    },
    args: {
        size: 'default',
    },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
    render: (args) => (
        <Avatar {...args}>
            <AvatarImage
                src="https://i.pravatar.cc/100?img=12"
                alt="User"
            />
            <AvatarFallback>DV</AvatarFallback>
        </Avatar>
    ),
};

export const Fallback: Story = {
    render: (args) => (
        <Avatar {...args}>
            <AvatarFallback>DV</AvatarFallback>
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

export const Group: Story = {
    render: () => (
        <AvatarGroup>
            <Avatar>
                <AvatarFallback>AA</AvatarFallback>
            </Avatar>
            <Avatar>
                <AvatarFallback>BB</AvatarFallback>
            </Avatar>
            <Avatar>
                <AvatarFallback>CC</AvatarFallback>
            </Avatar>
            <AvatarGroupCount>+5</AvatarGroupCount>
        </AvatarGroup>
    ),
};
