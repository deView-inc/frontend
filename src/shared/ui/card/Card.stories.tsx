import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Button } from '../button/component';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from './component';

const meta = {
    title: 'UI/Card',
    component: Card,
    tags: ['autodocs'],
    argTypes: {
        size: { control: 'inline-radio', options: ['sm', 'default'] },
    },
    args: {
        size: 'default',
    },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => (
        <Card
            {...args}
            className="w-80"
        >
            <CardHeader>
                <CardTitle>Собеседование</CardTitle>
                <CardDescription>Frontend Developer · 45 минут</CardDescription>
                <CardAction>
                    <Button
                        variant="ghost"
                        size="sm"
                    >
                        …
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                Совместный редактор кода, видеозвонок и оценка навыков кандидата в реальном времени.
            </CardContent>
            <CardFooter>
                <Button size="sm">Присоединиться</Button>
            </CardFooter>
        </Card>
    ),
};
