import type { Participant, ParticipantLevel, ParticipantRole } from '../model/participants';

export interface ParticipantDetailsProps {
    participant: Participant;
}

export type ParticipantCardProps = ParticipantDetailsProps & {
    responded?: boolean;
    onRespond?: (participant: Participant) => void;
};

export interface ParticipantSearchProps {
    query: string;
    setQuery: (query: string) => void;
}

export interface DirectoryFiltersProps {
    stack: string | null;
    setStack: (stack: string | null) => void;
    level: ParticipantLevel | null;
    setLevel: (level: ParticipantLevel | null) => void;
    role: ParticipantRole | null;
    setRole: (role: ParticipantRole | null) => void;
}

export interface EmptyParticipantsProps {
    resetFilters: () => void;
}
