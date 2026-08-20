import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './component';

const meta = {
    component: Accordion,
    tags: ['autodocs'],
    title: 'shared/ui/Accordion',
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <Accordion className="w-96">
            <AccordionItem value="item-1">
                <AccordionTrigger>What is deView?</AccordionTrigger>
                <AccordionContent>
                    deView is a platform for practicing technical interviews.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Is it free?</AccordionTrigger>
                <AccordionContent>Yes, the core features are free to use.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>How do I start?</AccordionTrigger>
                <AccordionContent>Sign up and jump into a practice room.</AccordionContent>
            </AccordionItem>
        </Accordion>
    ),
};

export const Multiple: Story = {
    render: () => (
        <Accordion
            openMultiple
            className="w-96"
        >
            <AccordionItem value="item-1">
                <AccordionTrigger>Section one</AccordionTrigger>
                <AccordionContent>Multiple items can be open at once.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Section two</AccordionTrigger>
                <AccordionContent>This one too.</AccordionContent>
            </AccordionItem>
        </Accordion>
    ),
};
