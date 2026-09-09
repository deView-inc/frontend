import type { EditorBindingOptions } from './types';

export function bindEditorReadOnly({
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
