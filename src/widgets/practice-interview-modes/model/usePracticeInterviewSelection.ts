import { useCallback, useMemo, useState } from 'react';

import type { PracticeInterviewTabsConfig } from '../lib';

interface PracticeInterviewTabState {
    value: string;
    label: string;
    setValue: (value: string) => void;
}

export function usePracticeInterviewSelection(tabs: readonly PracticeInterviewTabsConfig[]) {
    const [selection, setSelection] = useState<Record<string, string>>(() =>
        Object.fromEntries(tabs.map((tab) => [tab.id, tab.defaultValue])),
    );

    const setValue = useCallback(
        (id: string, value: string) => setSelection((prev) => ({ ...prev, [id]: value })),
        [],
    );

    const tabsState = useMemo<Record<string, PracticeInterviewTabState>>(
        () =>
            Object.fromEntries(
                tabs.map((tab) => [
                    tab.id,
                    {
                        label: tab.options.find((o) => o.value === selection[tab.id])?.label ?? '',
                        setValue: (value: string) => setValue(tab.id, value),
                        value: selection[tab.id],
                    },
                ]),
            ),
        [tabs, selection, setValue],
    );

    return { selection, setValue, tabsState };
}

export function usePracticeInterviewTab(tab: PracticeInterviewTabsConfig) {
    const { tabsState } = usePracticeInterviewSelection([tab]);

    return tabsState[tab.id];
}
