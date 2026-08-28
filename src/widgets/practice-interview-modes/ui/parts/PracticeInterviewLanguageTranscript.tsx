import { ClockIcon } from '@phosphor-icons/react';
import { cn } from '~&/shared/lib/utils';
import { Card } from '~&/shared/ui';

import type { TranscriptMessage, TranscriptSegment } from '../../lib';

interface Props {
    messages: TranscriptMessage[];
    className?: string;
}

function TranscriptSegmentView({ segment }: { segment: TranscriptSegment }) {
    if (segment.type === 'highlight') {
        return (
            <span className="decoration-primary underline decoration-dotted decoration-2 underline-offset-4">
                {segment.text}
            </span>
        );
    }

    if (segment.type === 'correction') {
        return (
            <>
                <span className="text-destructive line-through">{segment.wrong}</span>{' '}
                <span className="text-primary font-semibold">{segment.correct}</span>
            </>
        );
    }

    return <>{segment.text}</>;
}

function TranscriptMessageRow({ message }: { message: TranscriptMessage }) {
    const speakerLabel = message.speaker === 'ai' ? 'AI' : 'Вы';

    return (
        <p className="text-muted-foreground text-sm leading-relaxed">
            <span className="text-foreground font-semibold">{speakerLabel}:</span>{' '}
            {message.segments.map((segment, index) => (
                <TranscriptSegmentView
                    key={`${message.id}-${index}`}
                    segment={segment}
                />
            ))}
        </p>
    );
}

export function PracticeInterviewLanguageTranscript({ messages, className }: Props) {
    return (
        <Card className={cn('overflow-hidden rounded-md p-0', className)}>
            <div className="border-border bg-secondary flex items-center gap-3 border-b px-4 py-3">
                <div className="bg-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-md">
                    <ClockIcon
                        size={32}
                        className="text-primary-foreground"
                    />
                </div>
                <div>
                    <h3 className="text-sm font-semibold">Live-транскрипт</h3>
                    <p className="text-muted-foreground text-xs">
                        Whisper · распознавание в реальном времени
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-4 px-5 pt-4 pb-8">
                {messages.map((message) => (
                    <TranscriptMessageRow
                        key={message.id}
                        message={message}
                    />
                ))}
            </div>
        </Card>
    );
}
