import { useCallback, useState } from 'react';

import type { PracticeInterviewTabsConfig } from '../lib';

export function usePracticeInterviewSelection(tabs: readonly PracticeInterviewTabsConfig[]) {
    const [selection, setSelection] = useState<Record<string, string>>(() =>
        Object.fromEntries(tabs.map((tab) => [tab.id, tab.defaultValue])),
    );

    const setValue = useCallback(
        (id: string, value: string) => setSelection((prev) => ({ ...prev, [id]: value })),
        [],
    );

    const getLabel = useCallback(
        (id: string) =>
            tabs
                .find((tab) => tab.id === id)
                ?.options.find((option) => option.value === selection[id])?.label ?? '',
        [tabs, selection],
    );

    return { getLabel, selection, setValue };
}
