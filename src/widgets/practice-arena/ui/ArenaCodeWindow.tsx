import { cn } from '~&/shared/lib/utils';
import { CodeBody, type CodeSnippet, CodeWindowHeader } from '~&/shared/ui/code-window';

interface ArenaCodeWindowProps {
    className?: string;
    fileName: string;
    passedTests: number;
    totalTests: number;
    snippet: CodeSnippet;
    isCurrentUser: boolean;
}

export function ArenaCodeWindow({
    className,
    fileName,
    passedTests,
    totalTests,
    snippet,
    isCurrentUser,
}: ArenaCodeWindowProps) {
    const isOpponent = !isCurrentUser;

    return (
        <div
            className={cn(
                'bg-card border-border min-w-0 overflow-hidden rounded-sm border',
                className,
            )}
        >
            <CodeWindowHeader
                className="bg-secondary px-4"
                dotColor="var(--border)"
                fileName={fileName}
                statusLabel={`${passedTests}/${totalTests} тестов`}
                statusColor={isCurrentUser ? 'var(--primary)' : 'var(--muted-foreground)'}
                live={false}
            />

            <div className={cn(isOpponent && 'blur-[2px] opacity-[0.55]')}>
                <CodeBody
                    className="min-h-40 overflow-x-auto px-[18px] py-5 text-[13px] leading-6"
                    snippet={snippet}
                />
            </div>
        </div>
    );
}
