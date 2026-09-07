import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';

const meta = {
    title: 'UI/Tabs',
    component: Tabs,
    tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <Tabs
            defaultValue="overview"
            className="w-80"
        >
            <TabsList>
                <TabsTrigger value="overview">Обзор</TabsTrigger>
                <TabsTrigger value="stats">Статистика</TabsTrigger>
                <TabsTrigger value="history">История</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">Общая информация о собеседовании.</TabsContent>
            <TabsContent value="stats">Метрики и результаты кандидата.</TabsContent>
            <TabsContent value="history">Список прошедших сессий.</TabsContent>
        </Tabs>
    ),
};

export const LineVariant: Story = {
    render: () => (
        <Tabs
            defaultValue="a"
            className="w-80"
        >
            <TabsList variant="line">
                <TabsTrigger value="a">Первая</TabsTrigger>
                <TabsTrigger value="b">Вторая</TabsTrigger>
            </TabsList>
            <TabsContent value="a">Содержимое первой вкладки.</TabsContent>
            <TabsContent value="b">Содержимое второй вкладки.</TabsContent>
        </Tabs>
    ),
};
