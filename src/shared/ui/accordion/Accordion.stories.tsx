import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './component';

const meta = {
    title: 'UI/Accordion',
    component: Accordion,
    tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <Accordion className="w-80">
            <AccordionItem value="item-1">
                <AccordionTrigger>Что такое deView?</AccordionTrigger>
                <AccordionContent>
                    Платформа для проведения онлайн-собеседований с совместным редактором кода.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Нужна ли установка?</AccordionTrigger>
                <AccordionContent>Нет, всё работает прямо в браузере.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>Есть ли запись сессий?</AccordionTrigger>
                <AccordionContent>
                    Да, каждую сессию можно сохранить и пересмотреть.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    ),
};
