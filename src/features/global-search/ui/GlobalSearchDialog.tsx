import { Command, CommandDialog, CommandInput } from '~&/shared/ui';

import { GlobalSearchList } from './GlobalSearchList';

export function GlobalSearchDialog({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}) {
    return (
        <CommandDialog
            open={isOpen}
            onOpenChange={setIsOpen}
            className="max-w-sm rounded border"
        >
            <Command>
                <CommandInput placeholder="Найти участника" />
                <GlobalSearchList />
            </Command>
        </CommandDialog>
    );
}
