'use client';
import {
    languageRoomTabs,
    language_metrics,
    language_transcript,
    language_vocabulary,
} from '../lib';
import { usePracticeInterviewSelection } from '../model/usePracticeInterviewSelection';
import { PracticeInterviewLanguageTranscript } from './parts/PracticeInterviewLanguageTranscript';
import { PracticeInterviewMetrics } from './parts/PracticeInterviewMetrics';
import { PracticeInterviewTabsGroup } from './parts/PracticeInterviewTabsGroup';
import { PracticeInterviewVocabulary } from './parts/PracticeInterviewVocabulary';

interface Props {
    className?: string;
}

export const PracticeInterviewLanguage = ({ className }: Props) => {
    const { id, ...tabs } = languageRoomTabs;
    const { selection, setValue } = usePracticeInterviewSelection([languageRoomTabs]);

    return (
        <div className={className}>
            <PracticeInterviewTabsGroup
                {...tabs}
                value={selection[id]}
                onValueChange={(value) => setValue(id, value)}
            />
            <div className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <PracticeInterviewLanguageTranscript
                    messages={language_transcript}
                    className="self-start"
                />
                <div className="flex max-w-[660px] flex-col gap-5">
                    <PracticeInterviewMetrics list={language_metrics} />
                    <PracticeInterviewVocabulary terms={language_vocabulary} />
                </div>
            </div>
        </div>
    );
};
