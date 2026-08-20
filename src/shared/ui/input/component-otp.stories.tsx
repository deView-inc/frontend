import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from './component-otp';

const meta = {
    component: InputOTP,
    tags: ['autodocs'],
    title: 'shared/ui/InputOTP',
} satisfies Meta<typeof InputOTP>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <InputOTP maxLength={6}>
            <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
            </InputOTPGroup>
        </InputOTP>
    ),
};

export const FourDigits: Story = {
    render: () => (
        <InputOTP maxLength={4}>
            <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
            </InputOTPGroup>
        </InputOTP>
    ),
};
