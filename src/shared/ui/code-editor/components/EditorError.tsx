interface EditorErrorProps {
    onRetry: () => void;
}

export function EditorError({ onRetry }: EditorErrorProps) {
    return (
        <div
            role="alert"
            className="bg-card relative flex items-center gap-3 p-4 text-sm"
        >
            Не удалось загрузить редактор или его обработчики.
            <button
                className="underline"
                onClick={onRetry}
            >
                Повторить загрузку
            </button>
        </div>
    );
}
