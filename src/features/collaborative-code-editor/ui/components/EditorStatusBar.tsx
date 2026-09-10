import type { SyncState, SyncStatus } from '../../model/types';

const labels = {
    connecting: 'Подключение…',
    syncing: 'Синхронизация…',
    connected: 'live',
    reconnecting: 'Восстановление связи…',
    error: 'Ошибка синхронизации',
} satisfies Record<SyncStatus, string>;

interface Props {
    state: SyncState;
    editorFailed: boolean;
    onRetry: () => void;
}

export function EditorStatusBar({ state, editorFailed, onRetry }: Props) {
    return (
        <div className="border-border flex shrink-0 flex-wrap items-center justify-between gap-2 border-t px-3.5 py-2 font-mono text-xs">
            <span
                role="status"
                data-testid="sync-status"
                data-status={editorFailed ? 'error' : state.status}
                className={
                    !editorFailed && state.status === 'connected'
                        ? 'text-primary'
                        : 'text-muted-foreground'
                }
            >
                ● {editorFailed ? 'Ошибка редактора' : labels[state.status]}
            </span>
            {state.errorMessage && <span role="alert">{state.errorMessage}</span>}
            {state.retryable && (state.status === 'error' || state.status === 'reconnecting') && (
                <button
                    type="button"
                    className="underline"
                    onClick={onRetry}
                >
                    Повторить
                </button>
            )}
            <span className="text-muted-foreground">UTF-8 · 2 пробела</span>
        </div>
    );
}
