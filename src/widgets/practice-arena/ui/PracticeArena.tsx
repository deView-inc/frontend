import { Section } from '~&/shared/ui/section';

import { ArenaHeader } from './ArenaHeader';
import { ArenaLeaderboard } from './ArenaLeaderboard';
import { ArenaMatchPanel } from './ArenaMatchPanel';
import { ArenaTestCases } from './ArenaTestCases';

export function PracticeArena() {
    return (
        <Section className="max-w-[1400px]">
            <div className="flex flex-col gap-2.5">
                <ArenaHeader />

                <ArenaMatchPanel />

                <div className="grid grid-cols-1 gap-5 lg:min-h-[277px] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
                    <ArenaTestCases />

                    <ArenaLeaderboard />
                </div>
            </div>
        </Section>
    );
}
