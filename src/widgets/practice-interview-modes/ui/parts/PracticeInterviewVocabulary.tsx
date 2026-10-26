import { cn } from '~&/shared/lib/utils';
import { Card } from '~&/shared/ui';

import type { VocabularyTerm } from '../../lib';

interface Props {
    terms: VocabularyTerm[];
    description?: string;
    className?: string;
}

function VocabularyTermBadge({ term }: { term: VocabularyTerm }) {
    return (
        <span className="bg-muted text-muted-foreground rounded-md px-4 py-2 text-sm">
            {term.label}
        </span>
    );
}

export function PracticeInterviewVocabulary({
    terms,
    description = 'AI предлагает термины по теме собеседования, которые вы ещё не использовали.',
    className,
}: Props) {
    return (
        <Card className={cn('rounded-md p-6', className)}>
            <h3 className="text-sm font-bold">Словарь для этой темы</h3>

            <div className="flex flex-wrap gap-2">
                {terms.map((term) => (
                    <VocabularyTermBadge
                        key={term.id}
                        term={term}
                    />
                ))}
            </div>

            <p className="text-muted-foreground text-sm">{description}</p>
        </Card>
    );
}
