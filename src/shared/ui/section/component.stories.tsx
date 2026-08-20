import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Section } from './component';

const meta = {
    argTypes: {
        padding: {
            control: 'inline-radio',
            options: ['none', '14', '18', '22', '24'],
        },
    },
    component: Section,
    tags: ['autodocs'],
    title: 'shared/ui/Section',
} satisfies Meta<typeof Section>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { padding: '24' },
    render: (args) => (
        <Section
            {...args}
            className="bg-muted/50"
        >
            <div className="bg-primary/10 text-center text-sm">Section with vertical padding</div>
        </Section>
    ),
};
