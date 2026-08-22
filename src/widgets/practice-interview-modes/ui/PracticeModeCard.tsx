import { ArrowRightIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import type { ComponentProps } from 'react';
import { cn } from '~&/shared/lib/utils';

import type { PracticeMode } from '../lib';

type PracticeModeCardProps = Omit<ComponentProps<'article'>, 'title'> & PracticeMode;

export function PracticeModeCard({
    className,
    cta,
    description,
    href,
    icon: Icon,
    tags,
    title,
    ...props
}: PracticeModeCardProps) {
    return (
        <article
            className={cn(
                'flex min-h-80 flex-col rounded-sm gap-3 p-6  text-card-foreground',
                className,
            )}
            {...props}
        >
            <div className="bg-secondary text-muted-foreground flex size-15 items-center justify-center rounded-sm">
                <Icon
                    aria-hidden="true"
                    size={28}
                    weight="regular"
                />
            </div>
            <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
            <p className="text-muted-foreground max-w-[300px] text-base leading-7">{description}</p>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <span
                        key={tag}
                        className="bg-secondary text-muted-foreground rounded-sm px-3 py-1 text-sm font-medium"
                    >
                        {tag}
                    </span>
                ))}
            </div>
            <Link
                className="text-primary focus-visible:outline-primary text-base font-semibold transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4"
                href={href}
            >
                {cta}{' '}
                <ArrowRightIcon
                    aria-hidden="true"
                    className="inline-block"
                    weight="bold"
                />
            </Link>
        </article>
    );
}
