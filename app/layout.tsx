import '~&/shared/styles/globals.css';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { cn } from '~&/shared/lib/utils';
import { Background } from '~&/shared/ui/background';

const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

const inter = Inter({
    adjustFontFallback: true,
    display: 'swap',
    subsets: ['latin'],
    variable: '--font-inter',
});

export const metadata: Metadata = {
    authors: [{ name: 'deView Team' }],
    category: 'technology',
    classification:
        'recruitment, technical interviews, code collaboration, hiring platform, video interviews',
    creator: 'deView',
    description:
        'deView - это современная платформа для проведения онлайн-собеседований с возможностью совместного просмотра кода, видео-конференцсвязи и оценки навыков кандидатов в реальном времени.',
    icons: {
        apple: [
            { sizes: '96x96', type: 'image/png', url: '/meta/96x96.png' },
            { sizes: '192x192', type: 'image/png', url: '/meta/192x192.png' },
            { sizes: '512x512', type: 'image/png', url: '/meta/512x512.png' },
        ],
        icon: [
            { sizes: 'any', url: '/meta/favicon.ico' },
            { sizes: '96x96', type: 'image/png', url: '/meta/96x96.png' },
            { sizes: '192x192', type: 'image/png', url: '/meta/192x192.png' },
            { sizes: '512x512', type: 'image/png', url: '/meta/512x512.png' },
        ],

        shortcut: [{ url: '/meta/favicon.ico' }],
    },
    keywords:
        'онлайн собеседования, deView, платформа для собеседований, технические интервью, совместный просмотр кода, рекрутинг, найм, video interview, code interview',
    manifest: '/meta/manifest.json',
    openGraph: {
        description:
            'Проводите технические интервью эффективно: совместный редактор кода, видеозвонки, оценка навыков и удобный процесс найма в одном месте.',
        images: [
            {
                alt: 'deView - платформа для онлайн-собеседований и технических интервью',
                height: 630,
                url: 'https://app.deview.ru/og-image.png',
                width: 1200,
            },
        ],
        locale: 'ru_RU',
        siteName: 'deView',
        title: 'deView - Платформа для онлайн-собеседований',
        type: 'website',
        url: 'https://app.deview.ru',
    },
    publisher: 'deView',
    robots: 'index, follow',
    title: {
        default: 'deView - Платформа для онлайн-собеседований',
        template: 'deView - %s',
    },
    twitter: {
        card: 'summary_large_image',
        creator: '@deview',
        description:
            'Проводите технические интервью эффективно: совместный редактор кода, видеозвонки, оценка навыков и удобный процесс найма в одном месте.',
        images: ['https://app.deview.ru/twitter-image.png'],
        site: '@deview',
        title: 'deView - Платформа для онлайн-собеседований',
    },
};

export default function RootLayout({ children }: React.PropsWithChildren) {
    return (
        <html
            lang="en"
            className={cn(
                'h-full',
                'antialiased',
                'font-mono',
                jetbrainsMono.variable,
                inter.variable,
            )}
        >
            <body className="background-grid flex min-h-full flex-col">
                <Background />
                {children}
            </body>
        </html>
    );
}
