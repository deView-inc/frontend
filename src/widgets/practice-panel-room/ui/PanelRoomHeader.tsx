import { Title } from '~&/shared/ui';

import { panelRoomMock } from '../lib';

export function PanelRoomHeader() {
    const { session, participants } = panelRoomMock;

    const interviewersCount = participants.filter(({ type }) => type === 'interviewer').length;

    return (
        <header className="grid grid-cols-1 gap-y-1.5 pb-3 lg:grid-cols-[auto_auto] lg:justify-start lg:gap-x-24">
            <div className="min-w-0">
                <Title className="text-[26px] font-extrabold tracking-[-0.26px]">
                    {`Panel Room · ${session.position}, ${session.roundName}`}
                </Title>
            </div>

            <p className="text-muted-foreground mt-1.5 text-sm">
                {`Собеседование с панелью из ${interviewersCount} интервьюеров`}
            </p>

            <span className="border-primary bg-primary text-primary-foreground mt-1.5 inline-flex items-center gap-1.5 justify-self-start rounded-sm border px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap lg:col-start-2 lg:row-start-1 lg:mt-0">
                <span
                    aria-hidden
                    className="bg-primary-foreground size-1.5 shrink-0 rounded-full"
                />
                <span className="-translate-y-px">{`Раунд ${session.currentRound} из ${session.totalRounds}`}</span>
            </span>
        </header>
    );
}
