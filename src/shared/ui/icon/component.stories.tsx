import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Icon } from './component';

const meta = {
    args: {
        name: 'HouseIcon',
        size: 32,
    },
    component: Icon,
    tags: ['autodocs'],
    title: 'shared/ui/Icon',
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Gallery: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4">
            {(['HouseIcon', 'UserIcon', 'BellIcon', 'GearIcon', 'HeartIcon'] as const).map(
                (name) => (
                    <div
                        key={name}
                        className="flex flex-col items-center gap-1"
                    >
                        <Icon
                            name={name}
                            size={28}
                        />
                        <span className="text-muted-foreground text-xs">{name}</span>
                    </div>
                ),
            )}
        </div>
    ),
};

export const Weights: Story = {
    render: () => (
        <div className="flex items-center gap-4">
            <Icon
                name="HeartIcon"
                size={28}
                weight="thin"
            />
            <Icon
                name="HeartIcon"
                size={28}
                weight="regular"
            />
            <Icon
                name="HeartIcon"
                size={28}
                weight="bold"
            />
            <Icon
                name="HeartIcon"
                size={28}
                weight="fill"
            />
        </div>
    ),
};
