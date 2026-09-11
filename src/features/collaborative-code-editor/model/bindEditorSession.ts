import { MonacoBinding } from 'y-monaco';
import type { Awareness } from 'y-protocols/awareness';
import { UndoManager } from 'yjs';

import type { EditorBindingOptions, HistoryOptions } from './types';

function bindEditorHistory({ session, editor, monaco, text, binding }: HistoryOptions) {
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

function bindEditorPresence(awareness: Awareness, onParticipantsChange: (count: number) => void) {
    const style = document.createElement('style');
    document.head.append(style);
    let participantColors: Map<number, string> | null = null;

    const renderPresence = () => {
        const nextColors = new Map<number, string>();
        awareness.getStates().forEach((value, id) => {
            const color = value.user?.color;
            nextColors.set(
                id,
                typeof color === 'string' && /^#[0-9a-f]{6}$/i.test(color)
                    ? color.toLowerCase()
                    : '#a78bfa',
            );
        });
        // Cursor updates do not change styles; compare colors independently of map order.
        if (
            participantColors?.size === nextColors.size &&
            [...nextColors].every(([id, color]) => participantColors?.get(id) === color)
        ) {
            return;
        }
        if (participantColors?.size !== nextColors.size) {
            onParticipantsChange(nextColors.size);
        }
        participantColors = nextColors;
        style.textContent = [...nextColors]
            .map(
                ([id, color]) =>
                    `.yRemoteSelection-${id}{background:${color}33}.yRemoteSelectionHead-${id}{border-left:2px solid ${color};position:absolute;height:100%;box-sizing:border-box}.yRemoteSelectionHead-${id}::after{content:'';position:absolute;top:-2px;left:-3px;width:5px;height:5px;background:${color}}`,
            )
            .join('\n');
    };

    awareness.on('change', renderPresence);
    renderPresence();

    return () => {
        awareness.off('change', renderPresence);
        style.remove();
    };
}

function bindEditorReadOnly({
    session,
    editor,
}: Pick<EditorBindingOptions, 'session' | 'editor'>): () => void {
    const updateReadOnly = () => {
        const readOnly = session.getSnapshot().status !== 'connected';
        editor.updateOptions({ readOnly, domReadOnly: readOnly });
    };
    updateReadOnly();
    return session.subscribe(updateReadOnly);
}

export function bindEditorSession({
    session,
    editor,
    monaco,
    onParticipantsChange,
}: EditorBindingOptions) {
    const model = editor.getModel();

    if (!model) {
        return () => {};
    }

    const text = session.doc.getText('code');
    const binding = new MonacoBinding(text, model, new Set([editor]), session.awareness);
    const releaseHistory = bindEditorHistory({ session, editor, monaco, text, binding });
    const releasePresence = bindEditorPresence(session.awareness, onParticipantsChange);
    const releaseReadOnly = bindEditorReadOnly({ session, editor });
    let disposed = false;

    return () => {
        if (disposed) {
            return;
        }
        disposed = true;
        releaseReadOnly();
        releasePresence();
        releaseHistory();
        binding.destroy();
    };
}
