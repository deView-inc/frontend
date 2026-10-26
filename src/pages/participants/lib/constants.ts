import type { ParticipantLevel } from '../model/participants';

export const PARTICIPANT_LEVEL_CLASSES = {
    Junior: 'bg-[#7ccaff] text-[#0a0c0e]',
    Middle: 'bg-primary text-primary-foreground',
    Senior: 'bg-[#ac8cf5] text-[#0a0c0e]',
} satisfies Record<ParticipantLevel, string>;
