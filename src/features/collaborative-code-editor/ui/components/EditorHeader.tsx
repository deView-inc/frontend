export function EditorHeader({
    fileName,
    participants,
}: {
    fileName: string;
    participants: number;
}) {
    return (
        <div className="border-border flex flex-wrap items-center justify-between gap-2 border-b px-3.5 py-3 text-xs">
            <span>{fileName}</span>
            <span className="text-muted-foreground">
                Совместное редактирование ·{' '}
                <span data-testid="editor-participants">{participants}</span>
            </span>
        </div>
    );
}
