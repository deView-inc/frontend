import { type FormEvent, useState } from 'react';

import {
    DEFAULT_ROOM_NAME,
    DIFFICULTIES,
    type DifficultyId,
    LANGUAGES,
    type LanguageId,
    PRIMARY_LANGUAGES,
    isLanguageId,
} from '../lib';

export function useRoomCreateForm() {
    const [name, setName] = useState('');
    const [language, setLanguage] = useState<LanguageId>('js');
    const [difficulty, setDifficulty] = useState<DifficultyId>('middle');
    const [isOpen, setIsOpen] = useState(true);
    const [aiHints, setAiHints] = useState(false);
    const [recording, setRecording] = useState(false);
    const [task, setTask] = useState('');

    const selectedLanguage = LANGUAGES.find((item) => item.id === language);
    const selectedDifficulty = DIFFICULTIES.find((item) => item.id === difficulty);
    const isPrimaryLanguage = PRIMARY_LANGUAGES.some((item) => item.id === language);

    const handleLanguageChange = (value: string | null) => {
        if (!value || !isLanguageId(value)) {
            return;
        }

        setLanguage(value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return {
        aiHints,
        difficulty,
        handleLanguageChange,
        handleSubmit,
        isOpen,
        isPrimaryLanguage,
        language,
        name,
        previewName: name.trim() || DEFAULT_ROOM_NAME,
        recording,
        selectedDifficulty,
        selectedLanguage,
        setAiHints,
        setDifficulty,
        setIsOpen,
        setName,
        setRecording,
        setTask,
        task,
    };
}

export type RoomCreateFormModel = ReturnType<typeof useRoomCreateForm>;
