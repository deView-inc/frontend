import { cn } from '~&/shared/lib/utils';
import { type CodeSnippet, twoSumSnippet } from '~&/shared/ui/code-window/snippets/codeSnippets';

import { CodeBody } from './CodeBody';
import { CodeWindowHeader } from './CodeWindowHeader';
import { ParticipantsPanel } from './ParticipantsPanel';

interface Props {
    className?: string;
    snippet?: CodeSnippet;
    fileName?: string;
    statusLabel?: string;
    statusColor?: string;
    live?: boolean;
}

export const CodeWindow = ({
    className,
    snippet = twoSumSnippet,
    fileName = 'session · two_sum.js',
    statusLabel = 'LIVE 12:04',
    statusColor = '#FF6A5A',
    live = true,
}: Props) => (
    <div className={cn('lg:animate-floaty', className)}>
        <div className="border-border-strong bg-card overflow-hidden rounded-2xl border shadow-[0_40px_90px_rgba(0,0,0,0.5)]">
            <CodeWindowHeader
                fileName={fileName}
                statusLabel={statusLabel}
                statusColor={statusColor}
                live={live}
            />

            <div className="grid grid-cols-1 md:grid-cols-[1fr_120px] lg:grid-cols-[1fr_140px]">
                <CodeBody snippet={snippet} />
                <ParticipantsPanel />
            </div>
        </div>
    </div>
);
