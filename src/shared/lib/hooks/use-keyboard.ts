'use client';

// oxlint-disable no-undef
import * as React from 'react';

interface KeyboardShortcut {
    key: string;
    ctrl?: boolean;
    meta?: boolean;
    shift?: boolean;
    alt?: boolean;
    ignoreOnFocused?: boolean;
    preventDefault?: boolean;
    handler: (event: KeyboardEvent) => void;
}

const isInputActive = (target: EventTarget | null): boolean => {
    if (!target) {
        return false;
    }

    const element = target as HTMLElement;
    const tagName = element.tagName.toLowerCase();

    return (
        tagName === 'input' ||
        tagName === 'textarea' ||
        tagName === 'select' ||
        element.isContentEditable ||
        element.getAttribute('role') === 'textbox' ||
        element.getAttribute('contenteditable') === 'true'
    );
};

export function useKeyboard(shortcuts: KeyboardShortcut[]) {
    const onShortcutPointFx = React.useEffectEvent((event: KeyboardEvent) => {
        for (const shortcut of shortcuts) {
            const {
                handler,
                key,
                alt,
                ctrl,
                meta,
                ignoreOnFocused = true,
                preventDefault = true,
                shift,
            } = shortcut;

            if (ignoreOnFocused && isInputActive(event.target)) {
                continue;
            }

            const matchKey = event.key === key;
            const matchCtrl = ctrl === undefined || event.ctrlKey === ctrl;
            const matchMeta = meta === undefined || event.metaKey === meta;
            const matchShift = shift === undefined || event.shiftKey === shift;
            const matchAlt = alt === undefined || event.altKey === alt;

            if (matchKey && matchCtrl && matchMeta && matchShift && matchAlt) {
                if (preventDefault) {
                    event.preventDefault();
                }
                handler(event);
                break;
            }
        }
    });

    React.useEffect(() => {
        document.addEventListener('keydown', onShortcutPointFx);

        return () => {
            document.removeEventListener('keydown', onShortcutPointFx);
        };
    }, [shortcuts]);
}
