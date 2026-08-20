import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
} from './component-group';

const meta = {
    component: InputGroup,
    tags: ['autodocs'],
    title: 'shared/ui/InputGroup',
} satisfies Meta<typeof InputGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithIcon: Story = {
    render: () => (
        <InputGroup className="w-80">
            <InputGroupAddon>
                <MagnifyingGlassIcon className="size-4" />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search..." />
        </InputGroup>
    ),
};

export const WithButton: Story = {
    render: () => (
        <InputGroup className="w-80">
            <InputGroupInput placeholder="Enter email" />
            <InputGroupAddon align="inline-end">
                <InputGroupButton variant="primary">Submit</InputGroupButton>
            </InputGroupAddon>
        </InputGroup>
    ),
};

export const WithText: Story = {
    render: () => (
        <InputGroup className="w-80">
            <InputGroupAddon>
                <InputGroupText>https://</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput placeholder="example.com" />
        </InputGroup>
    ),
};

export const Textarea: Story = {
    render: () => (
        <InputGroup className="w-80">
            <InputGroupTextarea placeholder="Type your message..." />
            <InputGroupAddon align="block-end">
                <InputGroupButton
                    variant="primary"
                    className="ml-auto"
                >
                    Send
                </InputGroupButton>
            </InputGroupAddon>
        </InputGroup>
    ),
};
