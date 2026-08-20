import { FileTextIcon, XIcon } from '@phosphor-icons/react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import {
    Attachment,
    AttachmentAction,
    AttachmentActions,
    AttachmentContent,
    AttachmentDescription,
    AttachmentGroup,
    AttachmentMedia,
    AttachmentTitle,
} from './component';

const meta = {
    argTypes: {
        orientation: {
            control: 'inline-radio',
            options: ['horizontal', 'vertical'],
        },
        state: {
            control: 'select',
            options: ['idle', 'uploading', 'processing', 'error', 'done'],
        },
    },
    component: Attachment,
    tags: ['autodocs'],
    title: 'shared/ui/Attachment',
} satisfies Meta<typeof Attachment>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { state: 'done' },
    render: (args) => (
        <Attachment
            {...args}
            className="w-80"
        >
            <AttachmentMedia variant="icon">
                <FileTextIcon />
            </AttachmentMedia>
            <AttachmentContent>
                <AttachmentTitle>document.pdf</AttachmentTitle>
                <AttachmentDescription>1.2 MB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
                <AttachmentAction>
                    <XIcon />
                </AttachmentAction>
            </AttachmentActions>
        </Attachment>
    ),
};

export const States: Story = {
    render: () => (
        <div className="flex w-80 flex-col gap-3">
            {(['uploading', 'processing', 'error', 'done'] as const).map((state) => (
                <Attachment
                    key={state}
                    state={state}
                >
                    <AttachmentMedia variant="icon">
                        <FileTextIcon />
                    </AttachmentMedia>
                    <AttachmentContent>
                        <AttachmentTitle>file-{state}.pdf</AttachmentTitle>
                        <AttachmentDescription>{state}</AttachmentDescription>
                    </AttachmentContent>
                </Attachment>
            ))}
        </div>
    ),
};

export const Group: Story = {
    render: () => (
        <AttachmentGroup className="w-96">
            {['a.pdf', 'b.png', 'c.zip'].map((name) => (
                <Attachment
                    key={name}
                    className="w-48"
                >
                    <AttachmentMedia variant="icon">
                        <FileTextIcon />
                    </AttachmentMedia>
                    <AttachmentContent>
                        <AttachmentTitle>{name}</AttachmentTitle>
                    </AttachmentContent>
                </Attachment>
            ))}
        </AttachmentGroup>
    ),
};
