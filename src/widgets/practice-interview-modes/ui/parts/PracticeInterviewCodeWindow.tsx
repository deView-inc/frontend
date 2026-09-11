import { SparkleIcon, UserIcon } from '@phosphor-icons/react';
import { cn } from '~&/shared/lib/utils';
import { CodeBody } from '~&/shared/ui/code-window';

import { getAiPracticeSnippet } from '../../lib/ai-practice-snippets';

interface Props {
    className?: string;
    language: string;
}

export function PracticeInterviewCodeWindow({ className, language }: Props) {
    const { fileName, snippet } = getAiPracticeSnippet(language);
    return (
        <section
            aria-label="Превью AI-практики"
            className={cn(
                'bg-card border-border flex min-h-[380px] min-w-0 flex-col overflow-hidden rounded-md border',
                className,
            )}
        >
            <PreviewHeader fileName={fileName} />
            <div
                role="region"
                aria-label={`Пример кода: ${fileName}`}
                tabIndex={0}
                className="min-h-0 min-w-0 flex-1 overflow-auto"
            >
                <CodeBody
                    snippet={snippet}
                    className="w-max min-w-full [tab-size:4] select-text"
                />
            </div>
            <footer className="bg-secondary border-border flex flex-wrap items-center gap-3 border-t px-3.5 py-3">
                <PreviewAvatars />
                <span className="text-muted-foreground text-xs">Практика ещё не началась</span>
            </footer>
        </section>
    );
}

function PreviewHeader({ fileName }: { fileName: string }) {
    return (
        <header className="bg-secondary border-border flex flex-wrap items-center gap-3 border-b px-3.5 py-3">
            <span
                aria-hidden="true"
                className="text-muted-foreground flex gap-1.5"
            >
                <span className="size-2.5 rounded-full bg-current" />
                <span className="size-2.5 rounded-full bg-current" />
                <span className="size-2.5 rounded-full bg-current" />
            </span>
            <span className="text-muted-foreground font-mono text-xs">{fileName}</span>
            <span className="text-primary ml-auto text-xs font-semibold">Превью AI-практики</span>
        </header>
    );
}

function PreviewAvatars() {
    return (
        <div className="flex -space-x-1.5">
            <span
                role="img"
                aria-label="Вы"
                className="bg-primary text-primary-foreground border-secondary grid size-7 place-items-center rounded border-2"
            >
                <UserIcon
                    size={14}
                    aria-hidden="true"
                />
            </span>
            <span
                role="img"
                aria-label="AI-интервьюер"
                className="bg-ring text-primary-foreground border-secondary grid size-7 place-items-center rounded border-2"
            >
                <SparkleIcon
                    size={14}
                    aria-hidden="true"
                />
            </span>
        </div>
    );
}
