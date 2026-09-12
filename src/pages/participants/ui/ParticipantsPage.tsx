import type { Metadata } from 'next';

import { ParticipantsDirectory } from './ParticipantsDirectory';

export const metadata: Metadata = {
    title: 'Участники',
    description: 'Поиск партнёров для технических интервью',
    keywords: ['участники', 'технические интервью', 'поиск партнёра', 'стек технологий'],
    openGraph: {
        title: 'Участники',
        description: 'Поиск партнёров для технических интервью',
        url: 'https://app.deview.ru/participants',
    },
};

export function ParticipantsPage() {
    return <ParticipantsDirectory />;
}
