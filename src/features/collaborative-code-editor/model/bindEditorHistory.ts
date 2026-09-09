import type { MonacoBinding } from 'y-monaco';
import { UndoManager, type Text } from 'yjs';

import type { EditorBindingOptions } from './types';

interface HistoryOptions extends Pick<EditorBindingOptions, 'session' | 'editor' | 'monaco'> {
    text: Text;
    binding: MonacoBinding;
}

export function bindEditorHistory({ session, editor, monaco, text, binding }: HistoryOptions) {
    const undo = new UndoManager(text, { trackedOrigins: new Set([binding]) });

    const undoAction = editor.addAction({
        id: 'undo',
        label: 'Отменить своё изменение',
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyZ],
        run: () => {
            if (session.getSnapshot().status === 'connected') {
                undo.undo();
            }
        },
    });

    const redoAction = editor.addAction({
        id: 'redo',
        label: 'Повторить своё изменение',
        keybindings: [
            monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyZ,
            monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyY,
        ],
        run: () => {
            if (session.getSnapshot().status === 'connected') {
                undo.redo();
            }
        },
    });

    return () => {
        undoAction.dispose();
        redoAction.dispose();
        undo.destroy();
    };
}
