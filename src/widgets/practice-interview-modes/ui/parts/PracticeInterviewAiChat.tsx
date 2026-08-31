'use client';

import { ArrowRightIcon, SparkleIcon } from '@phosphor-icons/react';
import { cn } from '~&/shared/lib/utils';
import { Input } from '~&/shared/ui';
import type { FakeReplySource } from '~&/widgets/practice-interview-modes/lib';
import { useAiChat } from '~&/widgets/practice-interview-modes/model/useAiChat';

type ChatMessage = ReturnType<typeof useAiChat>['messages'][number];
type ScrollRef = ReturnType<typeof useAiChat>['scrollRef'];

interface Props {
    className?: string;
    subtitle: string;
    source: FakeReplySource;
}

export const PracticeInterviewAiChat = ({ className, subtitle, source }: Props) => {
    const { messages, value, setValue, scrollRef, handleSend } = useAiChat(source);

    return (
        <div
            className={cn(
                'flex h-[420px] min-h-0 w-full min-w-0 max-w-full flex-col overflow-hidden rounded-2xl border border-secondary bg-card sm:h-[480px] md:h-full ',
                className,
            )}
        >
            <AiChatHeader subtitle={subtitle} />
            <AiChatMain
                messages={messages}
                scrollRef={scrollRef}
            />
            <AiChatFooter
                value={value}
                setValue={setValue}
                handleSend={handleSend}
            />
        </div>
    );
};

interface AiChatHeaderProps {
    subtitle: string;
}

const AiChatHeader = ({ subtitle }: AiChatHeaderProps) => (
    <div className="bg-secondary flex shrink-0 items-center gap-3 border-b px-4 py-4 sm:px-5">
        <div className="bg-primary text-primary-foreground flex h-9 w-9 shrink-0 items-center justify-center rounded-md">
            <SparkleIcon size={22} />
        </div>
        <div className="min-w-0">
            <p className="truncate text-[15px] leading-tight font-medium text-white">
                AI-интервьюер
            </p>
            <p className="text-muted-foreground truncate text-[13px] leading-tight">{subtitle}</p>
        </div>
    </div>
);

interface AiChatMainProps {
    messages: ChatMessage[];
    scrollRef: ScrollRef;
}

const AiChatMain = ({ messages, scrollRef }: AiChatMainProps) => (
    <div
        ref={scrollRef}
        className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 py-5 sm:px-5"
    >
        {messages.map((message) => (
            <div
                key={message.id}
                className={
                    message.role === 'user'
                        ? 'bg-primary text-popover ml-auto max-w-[85%] rounded-2xl rounded-tr-sm px-4 py-3 text-[14px] leading-snug font-medium break-words'
                        : 'bg-muted text-foreground mr-auto max-w-[85%] rounded-2xl rounded-tl-sm px-4 py-3 text-[14px] leading-snug break-words'
                }
            >
                {message.text}
            </div>
        ))}
    </div>
);

interface AiChatFooterProps {
    value: string;
    setValue: (value: string) => void;
    handleSend: () => void;
}

const AiChatFooter = ({ value, setValue, handleSend }: AiChatFooterProps) => (
    <div className="flex shrink-0 items-center gap-2 border-t px-3 py-3 sm:px-4">
        <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ответить AI-интервьюеру..."
            className="bg-muted h-10 min-w-0 flex-1 rounded-lg px-3 text-[14px]"
        />
        <button
            onClick={handleSend}
            aria-label="Отправить"
            className="bg-primary text-popover flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition active:scale-95"
        >
            <ArrowRightIcon />
        </button>
    </div>
);
