import { SparkleIcon } from '@phosphor-icons/react';
import { cn } from '~&/shared/lib/utils';
import {
    CODE_TOKEN_STYLES,
    type CodeLine,
    type CodeSnippet,
} from '~&/shared/ui/code-window/snippets/codeSnippets';

interface Props {
    snippet: CodeSnippet;
    className?: string;
}

export const CodeBody = ({ className, snippet }: Props) => {
    const { lines, hint } = snippet;

    return (
        <div
            className={cn(
                'whitespace-pre px-3.5 py-4 font-mono text-[12.5px] leading-[1.85]',
                className,
            )}
        >
            {lines.map((line) => (
                <CodeBodyLine
                    key={line.number}
                    line={line}
                />
            ))}

            {hint && <CodeBodyHint text={hint.text} />}
        </div>
    );
};

interface CodeBodyLineProps {
    line: CodeLine;
}

const CodeBodyLine = ({ line }: CodeBodyLineProps) => (
    <div>
        <span className="text-[#5a636d]">{line.number}</span>{' '}
        {line.tokens.map((token, i) => (
            <span
                key={i}
                className={CODE_TOKEN_STYLES[token.variant ?? 'default']}
            >
                {token.text}
            </span>
        ))}
        {line.cursor && (
            <span className="animate-blink-caret animate-blink bg-primary ml-0.5 inline-block h-[15px] w-0.5 translate-y-[3px]" />
        )}
    </div>
);

interface CodeBodyHintProps {
    text: string;
}

const CodeBodyHint = ({ text }: CodeBodyHintProps) => (
    <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-lg border border-[rgba(167,139,250,0.3)] bg-[rgba(167,139,250,0.12)] px-2.5 py-1 text-[11px] whitespace-normal text-[#c9b8ff]">
        <SparkleIcon size={12} />
        {text}
    </div>
);
