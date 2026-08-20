import { GearIcon } from '@phosphor-icons/react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Button } from '../button';
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemMedia,
    ItemSeparator,
    ItemTitle,
} from './component';

const meta = {
    argTypes: {
        size: {
            control: 'inline-radio',
            options: ['default', 'sm', 'xs'],
        },
        variant: {
            control: 'inline-radio',
            options: ['default', 'muted', 'outline'],
        },
    },
    component: Item,
    tags: ['autodocs'],
    title: 'shared/ui/Item',
} satisfies Meta<typeof Item>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => (
        <Item
            {...args}
            className="w-96"
        >
            <ItemMedia variant="icon">
                <GearIcon />
            </ItemMedia>
            <ItemContent>
                <ItemTitle>Settings</ItemTitle>
                <ItemDescription>Manage your account preferences.</ItemDescription>
            </ItemContent>
            <ItemActions>
                <Button
                    size="sm"
                    variant="outline"
                >
                    Open
                </Button>
            </ItemActions>
        </Item>
    ),
};

export const Variants: Story = {
    render: () => (
        <div className="flex w-96 flex-col gap-3">
            <Item variant="default">
                <ItemContent>
                    <ItemTitle>Default</ItemTitle>
                </ItemContent>
            </Item>
            <Item variant="muted">
                <ItemContent>
                    <ItemTitle>Muted</ItemTitle>
                </ItemContent>
            </Item>
            <Item variant="outline">
                <ItemContent>
                    <ItemTitle>Outline</ItemTitle>
                </ItemContent>
            </Item>
        </div>
    ),
};

export const Group: Story = {
    render: () => (
        <ItemGroup className="w-96">
            <Item variant="outline">
                <ItemContent>
                    <ItemTitle>First item</ItemTitle>
                </ItemContent>
            </Item>
            <ItemSeparator />
            <Item variant="outline">
                <ItemContent>
                    <ItemTitle>Second item</ItemTitle>
                </ItemContent>
            </Item>
        </ItemGroup>
    ),
};
