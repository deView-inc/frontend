import { useCallback, useState } from 'react';

import {
    PARTICIPANTS,
    type Participant,
    type ParticipantLevel,
    type ParticipantRole,
} from './participants';

function useParticipantFilters() {
    const [query, setQuery] = useState('');
    const [stack, setStack] = useState<string | null>(null);
    const [level, setLevel] = useState<ParticipantLevel | null>(null);
    const [role, setRole] = useState<ParticipantRole | null>(null);
    const normalizedQuery = query.trim().toLocaleLowerCase('ru');
    const participants = PARTICIPANTS.filter(
        (participant) =>
            (stack === null || participant.stack.includes(stack)) &&
            (level === null || participant.level === level) &&
            (role === null || participant.role === role) &&
            [participant.name, participant.description, ...participant.stack]
                .join(' ')
                .toLocaleLowerCase('ru')
                .includes(normalizedQuery),
    );
    const resetFilters = useCallback(() => {
        setQuery('');
        setStack(null);
        setLevel(null);
        setRole(null);
    }, []);

    return {
        query,
        setQuery,
        stack,
        setStack,
        level,
        setLevel,
        role,
        setRole,
        participants,
        resetFilters,
    };
}

export function useProfileDirectory() {
    const filters = useParticipantFilters();
    const [responses, setResponses] = useState<string[]>([]);
    const [notice, setNotice] = useState('');
    const toggleResponse = useCallback(
        ({ id, name }: Participant) => {
            const responded = responses.includes(id);
            setResponses((current) =>
                responded ? current.filter((response) => response !== id) : [...current, id],
            );
            setNotice(`${name}: ${responded ? 'отклик отменён' : 'отклик отмечен локально'}.`);
        },
        [responses],
    );

    return { ...filters, responses, notice, toggleResponse };
}
