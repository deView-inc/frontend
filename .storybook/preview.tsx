import type { Decorator, Preview } from '@storybook/nextjs-vite';

import '../src/shared/styles/globals.css';

const withTheme: Decorator = (Story, context) => {
    const theme = context.globals.theme ?? 'light';

    return (
        <div
            className={theme === 'dark' ? 'dark' : ''}
            style={{
                // Fallbacks for the CSS variables normally injected by next/font
                ['--font-inter' as string]: 'Inter, ui-sans-serif, system-ui, sans-serif',
                ['--font-mono' as string]:
                    'JetBrains Mono, ui-monospace, SFMono-Regular, monospace',
            }}
        >
            <div className="bg-background text-foreground p-6 font-sans">
                <Story />
            </div>
        </div>
    );
};

const preview: Preview = {
    decorators: [withTheme],
    globalTypes: {
        theme: {
            description: 'Global theme for components',
            defaultValue: 'light',
            toolbar: {
                title: 'Theme',
                icon: 'circlehollow',
                items: [
                    { value: 'light', title: 'Light', icon: 'sun' },
                    { value: 'dark', title: 'Dark', icon: 'moon' },
                ],
                dynamicTitle: true,
            },
        },
    },
    parameters: {
        layout: 'centered',
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        a11y: {
            test: 'todo',
        },
    },
};

export default preview;
