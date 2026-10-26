'use client';

import * as React from 'react';
import { useKeyboard } from '~&/shared/lib/hooks';
import {
    Icon,
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
    Kbd,
    KbdGroup,
} from '~&/shared/ui';

import { GlobalSearchDialog } from './GlobalSearchDialog';

export function GlobalSearch() {
    const [open, setOpen] = React.useState(false);

    useKeyboard([
        {
            handler: () => setOpen((prev) => !prev),
            key: 'k',
            meta: true,
        },
        {
            ctrl: true,
            handler: () => setOpen((prev) => !prev),
            key: 'k',
        },
        {
            ctrl: true,
            handler: () => setOpen((prev) => !prev),
            key: '/',
        },
    ]);

    const handleOpen = React.useCallback((event: React.SyntheticEvent<HTMLDivElement>) => {
        event.stopPropagation();
        setOpen((prev) => !prev);
    }, []);

    return (
        <>
            <InputGroup onClick={handleOpen}>
                <InputGroupAddon>
                    <Icon
                        name="MagnifyingGlass"
                        className="size-3"
                    />
                </InputGroupAddon>
                <InputGroupInput
                    readOnly
                    placeholder="Найти участника"
                />
                <InputGroupAddon align="inline-end">
                    <InputGroupText>
                        <KbdGroup>
                            <Kbd>⌘K</Kbd>
                            <Kbd>⌘/</Kbd>
                        </KbdGroup>
                    </InputGroupText>
                </InputGroupAddon>
            </InputGroup>
            <GlobalSearchDialog
                isOpen={open}
                setIsOpen={setOpen}
            />
        </>
    );
}
