'use client';
import { VocabularyTermsList } from '~&/widgets/practice-interview-modes/ui/parts/VocabularyTermsList';

import {
    languageRoomTabs,
    language_metrics,
    language_transcript,
    language_vocabulary,
} from '../lib';
import { usePracticeInterviewTab } from '../model/usePracticeInterviewSelection';
import { PracticeInterviewInfoCard } from './parts/PracticeInterviewInfoCard';
import { PracticeInterviewLanguageTranscript } from './parts/PracticeInterviewLanguageTranscript';
import { PracticeInterviewMetrics } from './parts/PracticeInterviewMetrics';
import { PracticeInterviewTabsGroup } from './parts/PracticeInterviewTabsGroup';

interface Props {
    className?: string;
}

export const PracticeInterviewLanguage = ({ className }: Props) => {
    const { id, ...tabs } = languageRoomTabs;
    const { value, setValue } = usePracticeInterviewTab(languageRoomTabs);

    return (
        <div className={className}>
            <PracticeInterviewTabsGroup
                {...tabs}
                value={value}
                onValueChange={setValue}
            />
            <div className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <PracticeInterviewLanguageTranscript
                    messages={language_transcript}
                    className="self-start"
                />
                <div className="flex max-w-[660px] flex-col gap-5">
                    <PracticeInterviewMetrics list={language_metrics} />
                    <PracticeInterviewInfoCard
                        title="Словарь для этой темы"
                        description="AI предлагает термины по теме собеседования, которые вы ещё не использовали."
                    >
                        <VocabularyTermsList terms={language_vocabulary} />
                    </PracticeInterviewInfoCard>
                </div>
            </div>
        </div>
    );
};
