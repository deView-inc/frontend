import { existsSync, writeFileSync } from 'node:fs';
import { basename, dirname, extname, join } from 'node:path';

const [, , componentPath] = process.argv;

if (!componentPath) {
    console.error(
        'Укажи путь к компоненту:\n' + 'pnpm story:create src/shared/ui/Button/Button.tsx',
    );

    process.exit(1);
}

if (!existsSync(componentPath)) {
    console.error(`Компонент не найден: ${componentPath}`);
    process.exit(1);
}

const componentName = basename(componentPath, extname(componentPath));

const componentDirectory = dirname(componentPath);

const storyPath = join(componentDirectory, `${componentName}.stories.tsx`);

if (existsSync(storyPath)) {
    console.error(`Story уже существует: ${storyPath}`);
    process.exit(1);
}

const storyTemplate = `import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ${componentName} } from './${componentName}';

const meta = {
  component: ${componentName},
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ${componentName}>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
`;

writeFileSync(storyPath, storyTemplate, 'utf8');

console.log(`Story создан: ${storyPath}`);
