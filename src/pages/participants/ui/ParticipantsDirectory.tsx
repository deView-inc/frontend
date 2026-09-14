'use client';

import { useParticipantsDirectory } from '../model/useParticipantsDirectory';
import { DirectoryFilters } from './DirectoryFilters';
import { EmptyParticipants } from './EmptyParticipants';
import { MyCardDialog } from './MyCardDialog';
import { ParticipantCard } from './ParticipantCard/ParticipantCard';
import { ParticipantSearch } from './ParticipantSearch';

export function ParticipantsDirectory() {
    const {
        query,
        setQuery,
        stack,
        setStack,
        level,
        setLevel,
        role,
        setRole,
        participants,
        responses,
        notice,
        resetFilters,
        toggleResponse,
    } = useParticipantsDirectory();

    return (
        <section
            aria-label="Участники"
            className="@container w-full max-w-[1140px] font-sans"
        >
            <div className="mb-[14px] flex flex-wrap gap-3">
                <ParticipantSearch
                    query={query}
                    setQuery={setQuery}
                />
                <MyCardDialog />
            </div>
            <DirectoryFilters
                stack={stack}
                setStack={setStack}
                level={level}
                setLevel={setLevel}
                role={role}
                setRole={setRole}
            />
            <p
                role="status"
                className="text-muted-foreground mb-[14px] font-mono text-[11px]"
            >
                Найдено участников: {participants.length}
            </p>
            <div className="grid grid-cols-1 gap-4 @min-[680px]:grid-cols-2 @min-[1080px]:grid-cols-3">
                {participants.map((participant) => (
                    <ParticipantCard
                        key={participant.id}
                        participant={participant}
                        responded={responses.includes(participant.id)}
                        onRespond={toggleResponse}
                    />
                ))}
            </div>
            {participants.length === 0 && <EmptyParticipants resetFilters={resetFilters} />}
            <p
                role="status"
                className="sr-only"
            >
                {notice}
            </p>
        </section>
    );
}
