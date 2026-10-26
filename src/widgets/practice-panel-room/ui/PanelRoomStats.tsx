'use client';

import {
    ChartBarIcon,
    CheckIcon,
    CirclesThreeIcon,
    ClockIcon,
    StarFourIcon,
} from '@phosphor-icons/react';
import { Card } from '~&/shared/ui';

import { panelRoomMock } from '../lib';

export function PanelRoomStats() {
    const { session, participants } = panelRoomMock;

    const interviewersCount = participants.filter(({ type }) => type === 'interviewer').length;

    const stats = [
        {
            icon: <ClockIcon size={16} />,
            id: 'remaining-time',
            label: 'до конца раунда',
            value: session.remainingTime,
        },
        {
            icon: <CirclesThreeIcon size={16} />,
            id: 'interviewers',
            label: 'интервьюера',
            value: interviewersCount,
        },
        {
            icon: <CheckIcon size={16} />,
            id: 'consensus',
            label: 'консенсус-балл',
            value: session.consensusScore,
        },
        {
            icon: (
                <StarFourIcon
                    className="text-primary"
                    size={16}
                />
            ),
            id: 'moderator',
            label: 'роль: модератор',
            value: session.moderator,
        },
        {
            icon: (
                <ChartBarIcon
                    size={16}
                    weight="light"
                />
            ),
            id: 'stages',
            label: 'этапов пройдено',
            value: `${session.currentStage}/${session.totalStages}`,
        },
    ];

    return (
        <section
            aria-label="Информация о сессии"
            className="pt3 grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-3.5"
        >
            {stats.map(({ icon, id, label, value }) => (
                <Card
                    key={id}
                    className="gap-0 rounded-sm p-4"
                >
                    <div className="bg-secondary text-muted-foreground grid size-[30px] place-items-center rounded-sm border">
                        {icon}
                    </div>

                    <p className="mt-2 font-mono text-lg font-extrabold">{value}</p>

                    <p className="text-muted-foreground mt-0.5 text-[11px]">{label}</p>
                </Card>
            ))}
        </section>
    );
}
