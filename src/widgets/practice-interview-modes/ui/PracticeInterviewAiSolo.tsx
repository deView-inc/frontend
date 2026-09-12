'use client';

import { ArrowRightIcon, SparkleIcon, UserIcon } from '@phosphor-icons/react';
import { useMemo } from 'react';
import { Button, Card } from '~&/shared/ui';
import { Section } from '~&/shared/ui/section';

import { type FakeReplySource, type InterviewStyle, aiSoloTabs } from '../lib';
import { usePracticeInterviewSelection } from '../model/usePracticeInterviewSelection';
import { PracticeInterviewAiChat } from './parts/PracticeInterviewAiChat';
import { PracticeInterviewBanner } from './parts/PracticeInterviewBanner';
import { PracticeInterviewCodeWindow } from './parts/PracticeInterviewCodeWindow';
import { PracticeInterviewTabsGroup } from './parts/PracticeInterviewTabsGroup';

const partnerIconElement = (
    <UserIcon
        className="text-muted-foreground"
        size={18}
    />
);
const aiIconElement = (
    <SparkleIcon
        className="text-primary-foreground"
        size={22}
    />
);

export function PracticeInterviewAiSolo() {
    const { tabsState } = usePracticeInterviewSelection(aiSoloTabs);
    const style = tabsState.style.value as InterviewStyle;
    const chatSource = useMemo<FakeReplySource>(() => ({ mode: 'solo', style }), [style]);

    return (
        <Section className="max-w-[1400px]">
            <Card className="mt-5 grid grid-cols-1 gap-4 rounded-md p-5 sm:gap-8 sm:px-7 sm:py-8 md:grid-cols-2">
                {aiSoloTabs.map(({ id, className, ...tabs }) => {
                    const { value, setValue: handleValueChange } = tabsState[id];
                    return (
                        <PracticeInterviewTabsGroup
                            key={id}
                            className={className}
                            {...tabs}
                            value={value}
                            onValueChange={handleValueChange}
                        />
                    );
                })}
            </Card>
            <div className="mt-5 flex flex-col gap-5 sm:flex-row">
                <PracticeInterviewBanner
                    icon={partnerIconElement}
                    title="Живое интервью с партнёром"
                    description="Найдите реального собеседника в открытых комнатах, получите взаимный фидбэк и видеозапись."
                />
                <PracticeInterviewBanner
                    icon={aiIconElement}
                    iconBackgroundColor="bg-primary"
                    glowClassName="from-primary/20 to-transparent"
                    badgeLabel="● Выбрано"
                    badgeColor="bg-primary"
                    title="Соло-практика с AI"
                    description="AI ведёт интервью, задаёт уточняющие вопросы и даёт фидбэк сразу — доступно 24/7, партнёр не нужен."
                />
            </div>
            <div className="mt-8 flex flex-col gap-5 sm:mt-5 md:h-[600px] md:flex-row">
                <PracticeInterviewCodeWindow
                    className="md:h-full md:min-w-0 md:flex-1"
                    language={tabsState.language.value}
                />
                <PracticeInterviewAiChat
                    subtitle={`${tabsState.style.label} · ${tabsState.level.label}`}
                    source={chatSource}
                    className="md:max-w-[420px] md:min-w-0 md:flex-1"
                />
            </div>
            <StartPracticeAction />
        </Section>
    );
}

function StartPracticeAction() {
    return (
        <div className="mt-3 text-center xl:text-end">
            <Button className="inline-flex w-full gap-2 px-6 py-6 md:w-[220px]">
                Начать практику с AI <ArrowRightIcon />
            </Button>
        </div>
    );
}
