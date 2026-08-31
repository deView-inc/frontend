'use client';

import { ArrowRightIcon, SparkleIcon, UserIcon } from '@phosphor-icons/react';
import { Button, Card } from '~&/shared/ui';
import { Section } from '~&/shared/ui/section';

import { type InterviewStyle, aiSoloTabs } from '../lib';
import { usePracticeInterviewSelection } from '../model/usePracticeInterviewSelection';
import { PracticeInterviewAiChat } from './parts/PracticeInterviewAiChat';
import { PracticeInterviewBanner } from './parts/PracticeInterviewBanner';
import { PracticeInterviewCodeWindow } from './parts/PracticeInterviewCodeWindow';
import { PracticeInterviewTabsGroup } from './parts/PracticeInterviewTabsGroup';

export function PracticeInterviewAiSolo() {
    const { tabsState } = usePracticeInterviewSelection(aiSoloTabs);

    return (
        <Section className="max-w-[1400px]">
            <Card className="mt-5 grid grid-cols-1 gap-4 rounded-md p-5 sm:gap-8 sm:px-7 sm:py-8 md:grid-cols-2">
                {aiSoloTabs.map(({ id, className, ...tabs }) => (
                    <PracticeInterviewTabsGroup
                        key={id}
                        className={className}
                        {...tabs}
                        value={tabsState[id].value}
                        onValueChange={tabsState[id].setValue}
                    />
                ))}
            </Card>
            <div className="mt-5 flex flex-col gap-5 sm:flex-row">
                <PracticeInterviewBanner
                    icon={
                        <UserIcon
                            className="text-muted-foreground"
                            size={18}
                        />
                    }
                    title="Живое интервью с партнёром"
                    description="Найдите реального собеседника в открытых комнатах, получите взаимный фидбэк и видеозапись."
                />
                <PracticeInterviewBanner
                    icon={
                        <SparkleIcon
                            className="text-primary-foreground"
                            size={22}
                        />
                    }
                    iconBackgroundColor="bg-primary"
                    glowClassName="from-primary/20 to-transparent"
                    badgeLabel="● Выбрано"
                    badgeColor="bg-primary"
                    title="Соло-практика с AI"
                    description="AI ведёт интервью, задаёт уточняющие вопросы и даёт фидбэк сразу — доступно 24/7, партнёр не нужен."
                />
            </div>
            <div className="mt-8 flex flex-col gap-5 sm:mt-5 md:h-[600px] md:flex-row">
                <PracticeInterviewCodeWindow className="md:h-full md:min-w-0 md:flex-1" />
                <PracticeInterviewAiChat
                    subtitle={`${tabsState.style.label} · ${tabsState.level.label}`}
                    source={{ mode: 'solo', style: tabsState.style.value as InterviewStyle }}
                    className="md:max-w-[420px] md:min-w-0 md:flex-1"
                />
            </div>
            <div className="mt-3 text-center xl:text-end">
                <Button className="inline-flex w-full gap-2 px-6 py-6 md:w-[220px]">
                    Начать практику с AI <ArrowRightIcon />
                </Button>
            </div>
        </Section>
    );
}
