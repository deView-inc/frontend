import { Section } from '~&/shared/ui/section';

import { PanelAiNotes } from './PanelAiNotes';
import { PanelParticipantsGrid } from './PanelParticipantsGrid';
import { PanelRoomHeader } from './PanelRoomHeader';
import { PanelRoomStats } from './PanelRoomStats';
import { PanelRoundTimeline } from './PanelRoundTimeline';
import { PanelScores } from './PanelScores';

export function PracticePanelRoom() {
    return (
        <Section className="flex max-w-[1440px] flex-col gap-2.5">
            <PanelRoomHeader />

            <PanelRoomStats />

            <div className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
                <div className="flex min-w-0 flex-col gap-5">
                    <PanelParticipantsGrid />

                    <PanelRoundTimeline />
                </div>

                <div className="flex min-w-0 flex-col gap-5">
                    <PanelScores />

                    <PanelAiNotes />
                </div>
            </div>
        </Section>
    );
}
