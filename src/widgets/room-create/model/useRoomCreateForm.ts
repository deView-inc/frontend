import { useRouter } from 'next/navigation';
import { type FormEvent, useState } from 'react';
import { ROUTES } from '~&/shared/config';

import {
    DEFAULT_ROOM_NAME,
    DIFFICULTIES,
    type DifficultyId,
    LANGUAGES,
    type LanguageId,
    PRIMARY_LANGUAGES,
    createRoomId,
    isLanguageId,
} from '../lib';

function openCreatedRoom(router: ReturnType<typeof useRouter>, name: string) {
    router.push(ROUTES.ROOM.SESSION(createRoomId(name.trim() || DEFAULT_ROOM_NAME)));
}

function useRoomCreateFields() {
    const [name, setName] = useState('');
    const [language, setLanguage] = useState<LanguageId>('js');
    const [difficulty, setDifficulty] = useState<DifficultyId>('middle');
    const [isOpen, setIsOpen] = useState(true);
    const [aiHints, setAiHints] = useState(false);
    const [recording, setRecording] = useState(false);
    const [task, setTask] = useState('');

    return {
        aiHints,
        difficulty,
        isOpen,
        language,
        name,
        recording,
        setAiHints,
        setDifficulty,
        setIsOpen,
        setLanguage,
        setName,
        setRecording,
        setTask,
        task,
    };
}

export function useRoomCreateForm() {
    const router = useRouter();
    const { language, name, setLanguage, ...fields } = useRoomCreateFields();

    const handleLanguageChange = (value: string | null) => {
        if (!value || !isLanguageId(value)) {
            return;
        }

        setLanguage(value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        openCreatedRoom(router, name);
    };

    return {
        ...fields,
        handleLanguageChange,
        handleSubmit,
        isPrimaryLanguage: PRIMARY_LANGUAGES.some((item) => item.id === language),
        language,
        name,
        previewName: name.trim() || DEFAULT_ROOM_NAME,
        selectedDifficulty: DIFFICULTIES.find((item) => item.id === fields.difficulty),
        selectedLanguage: LANGUAGES.find((item) => item.id === language),
    };
}

export type RoomCreateFormModel = ReturnType<typeof useRoomCreateForm>;
