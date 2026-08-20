import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Container } from './component';

const meta = {
    argTypes: {
        paddingX: {
            control: 'inline-radio',
            options: ['none', '28'],
        },
    },
    component: Container,
    tags: ['autodocs'],
    title: 'shared/ui/Container',
} satisfies Meta<typeof Container>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => (
        <Container
            {...args}
            className="bg-muted/50"
        >
            <div className="bg-primary/10 py-6 text-center text-sm">Centered container content</div>
        </Container>
    ),
};

export const WithPadding: Story = {
    args: { paddingX: '28' },
    render: (args) => (
        <Container
            {...args}
            className="bg-muted/50"
        >
            <div className="bg-primary/10 py-6 text-center text-sm">Horizontal padding of 28px</div>
        </Container>
    ),
};
