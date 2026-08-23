import { useState } from 'react';

import { aiSoloTabs } from '../lib';

export function usePracticeInterviewSelection() {
    const [selection, setSelection] = useState<Record<string, string>>(() =>
        Object.fromEntries(aiSoloTabs.map((tab) => [tab.id, tab.defaultValue])),
    );

    const setValue = (id: string, value: string) =>
        setSelection((prev) => ({ ...prev, [id]: value }));

    const getLabel = (id: string) =>
        aiSoloTabs.find((tab) => tab.id === id)?.options.find((o) => o.value === selection[id])
            ?.label ?? '';

    return { getLabel, selection, setValue };
}
