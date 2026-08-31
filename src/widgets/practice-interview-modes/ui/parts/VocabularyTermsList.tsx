import type { VocabularyTerm } from '../../lib';

interface Props {
    terms: VocabularyTerm[];
}

export function VocabularyTermsList({ terms }: Props) {
    return (
        <div className="flex flex-wrap gap-2">
            {terms.map((term) => (
                <span
                    key={term.id}
                    className="bg-muted text-muted-foreground rounded-md px-4 py-2 text-sm"
                >
                    {term.label}
                </span>
            ))}
        </div>
    );
}
