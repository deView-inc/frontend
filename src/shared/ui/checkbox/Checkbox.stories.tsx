import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Label } from '../label/component';
import { Checkbox } from './component';

const meta = {
    title: 'UI/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    argTypes: {
        disabled: { control: 'boolean' },
    },
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
        <Label className="cursor-pointer">
            <Checkbox {...args} />
            Принять условия
        </Label>
    ),
};
