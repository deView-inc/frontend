'use client';
import { languageRoomTabs, language_metrics } from '../lib';
import { usePracticeInterviewSelection } from '../model/usePracticeInterviewSelection';
import { PracticeInterviewMetrics } from './parts/PracticeInterviewMetrics';
import { PracticeInterviewTabsGroup } from './parts/PracticeInterviewTabsGroup';

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
            <PracticeInterviewMetrics list={language_metrics} />
        </div>
    );
};
