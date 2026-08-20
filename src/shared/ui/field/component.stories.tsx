import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Checkbox } from '../checkbox';
import { Input } from '../input';
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
    FieldTitle,
} from './component';

const meta = {
    argTypes: {
        orientation: {
            control: 'inline-radio',
            options: ['vertical', 'horizontal'],
        },
    },
    component: Field,
    tags: ['autodocs'],
    title: 'shared/ui/Field',
} satisfies Meta<typeof Field>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => (
        <Field
            {...args}
            className="w-80"
        >
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input
                id="name"
                placeholder="John Doe"
            />
            <FieldDescription>Enter your full name.</FieldDescription>
        </Field>
    ),
};

export const WithError: Story = {
    render: () => (
        <Field className="w-80">
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
                id="email"
                aria-invalid
                placeholder="you@example.com"
            />
            <FieldError errors={[{ message: 'Please enter a valid email address.' }]} />
        </Field>
    ),
};

export const Horizontal: Story = {
    render: () => (
        <Field
            orientation="horizontal"
            className="w-96"
        >
            <Checkbox id="terms" />
            <FieldContent>
                <FieldTitle>Accept terms</FieldTitle>
                <FieldDescription>You agree to our terms of service.</FieldDescription>
            </FieldContent>
        </Field>
    ),
};

export const FieldSetExample: Story = {
    render: () => (
        <FieldSet className="w-80">
            <FieldLegend>Profile</FieldLegend>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="first">First name</FieldLabel>
                    <Input id="first" />
                </Field>
                <Field>
                    <FieldLabel htmlFor="last">Last name</FieldLabel>
                    <Input id="last" />
                </Field>
            </FieldGroup>
        </FieldSet>
    ),
};
