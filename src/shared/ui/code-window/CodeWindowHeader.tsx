import { cn } from '~&/shared/lib/utils';

const DOT_COLORS = ['#FF6A5A', '#E7C15A', '#64D890'] as const;

interface Props {
    fileName: string;
    statusLabel: string;
    statusColor?: string;
    live?: boolean;
    className?: string;
}
export const CodeWindowHeader = ({
    fileName,
    statusLabel,
    statusColor = '#FF6A5A',
    live = true,
    className,
}: Props) => (
    <div
        className={cn(
            'flex items-center gap-2 border-b border-border bg-popover px-3.5 py-3',
            className,
        )}
    >
        <CodeHeaderDots />
        <CodeHeaderFileName fileName={fileName} />
        <CodeHeaderStatus
            statusLabel={statusLabel}
            statusColor={statusColor}
            live={live}
        />
    </div>
);

const CodeHeaderDots = () => (
    <div className="flex items-center gap-1.5">
        {DOT_COLORS.map((color) => (
            <span
                key={color}
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: color }}
            />
        ))}
    </div>
);

interface CodeHeaderFileNameProps {
    fileName: string;
}
const CodeHeaderFileName = ({ fileName }: CodeHeaderFileNameProps) => (
    <span className="text-muted-foreground ml-2 font-mono text-[11.5px]">{fileName}</span>
);

interface CodeHeaderStatusProps {
    statusLabel: string;
    statusColor: string;
    live: boolean;
}
const CodeHeaderStatus = ({ statusLabel, statusColor, live }: CodeHeaderStatusProps) => (
    <span
        className="ml-auto inline-flex items-center gap-1.5 font-mono text-[11px]"
        style={{ color: statusColor }}
    >
        <span
            className={cn(
                'h-1.5 w-1.5 rounded-full',
                live && 'animate-live-pulse animate-blink-caret',
            )}
            style={{ backgroundColor: statusColor }}
        />
        {statusLabel}
    </span>
);
