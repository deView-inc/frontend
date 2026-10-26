'use client';

import { PracticeInterviewHeader } from '~&/widgets/practice-interview-modes';

import { type InterviewCompetency, behavioralRoomTabs } from '../lib';
import { usePracticeInterviewTab } from '../model/usePracticeInterviewSelection';
import { PracticeInterviewAiChat } from './parts/PracticeInterviewAiChat';
import { PracticeInterviewCompetencyRadar } from './parts/PracticeInterviewCompetencyRadar';
import { PracticeInterviewStarBreakdown } from './parts/PracticeInterviewStarBreakdown';
import { PracticeInterviewTabsGroup } from './parts/PracticeInterviewTabsGroup';

interface Props {
    className?: string;
}

export const PracticeInterviewBehavioral = ({ className }: Props) => {
    const { id, ...tabs } = behavioralRoomTabs;
    const { value, label, setValue } = usePracticeInterviewTab(behavioralRoomTabs);

    return (
        <div className={className}>
            <PracticeInterviewHeader
                className="sm:sm:grid-cols-2 sm:place-items-start"
                title="Behavioral Room · Метод STAR"
                description={`Разбор поведенческого вопроса по компетенции «${label}»`}
                sideElement={
                    <div className="bg-primary text-primary-foreground order-1 mt-5 ml-0 w-fit rounded-md px-3 py-1 text-nowrap sm:order-0 sm:mt-0 sm:ml-[50px] sm:ml-[100px]">
                        ● Вопрос 3 из 6{' '}
                    </div>
                }
            />
            <PracticeInterviewTabsGroup
                className="mt-5"
                {...tabs}
                value={value}
                onValueChange={setValue}
            />
            <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-5 md:h-[600px] md:grid-cols-2">
                <PracticeInterviewAiChat
                    subtitle="Стиль: разбор без давления"
                    source={{
                        competency: value as InterviewCompetency,
                        mode: 'behavioral',
                    }}
                    className="md:min-w-0"
                />

                <div className="flex flex-col gap-5 md:min-w-0">
                    <PracticeInterviewStarBreakdown
                        statuses={{ S: 'done', T: 'done', A: 'done', R: 'active' }}
                        note="Result пока без цифр — AI попросит уточнить измеримый результат."
                    />
                    <PracticeInterviewCompetencyRadar
                        className="flex-1"
                        scores={{
                            communication: 60,
                            conflictResolution: 40,
                            leadership: 90,
                            ownership: 75,
                            reflection: 70,
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
