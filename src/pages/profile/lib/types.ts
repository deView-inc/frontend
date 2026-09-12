import type { Participant } from '../model/participants';

export interface ParticipantDetailsProps {
    participant: Participant;
}

export type ParticipantCardProps = ParticipantDetailsProps & {
    responded?: boolean;
    onRespond?: (participant: Participant) => void;
};
