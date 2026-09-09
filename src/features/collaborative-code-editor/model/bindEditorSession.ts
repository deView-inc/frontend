import { MonacoBinding } from 'y-monaco';

import { bindEditorHistory } from './bindEditorHistory';
import { bindEditorPresence } from './bindEditorPresence';
import { bindEditorReadOnly } from './bindEditorReadOnly';
import type { EditorBindingOptions } from './types';

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
