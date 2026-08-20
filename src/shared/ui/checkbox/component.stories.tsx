import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Checkbox } from './component';

const meta = {
    argTypes: {
        disabled: { control: 'boolean' },
    },
    component: Checkbox,
    tags: ['autodocs'],
    title: 'shared/ui/Checkbox',
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
    args: { defaultChecked: true },
};

export const Disabled: Story = {
    args: { disabled: true },
};

export const WithLabel: Story = {
    render: (args) => (
        <label className="flex items-center gap-2 text-sm">
            <Checkbox {...args} />
            Accept terms and conditions
        </label>
    ),
};
