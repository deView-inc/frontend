'use client';

import dynamic from 'next/dynamic';
import { cn } from '~&/shared/lib/utils';

import type { EditorSessionSource } from '../model/types';
import { EditorBoundary } from './components/EditorBoundary';
import { EditorLoading } from './components/EditorLoading';

const CollaborationEditor = dynamic(() => import('./CollaborationEditor'), {
    ssr: false,
    loading: EditorLoading,
});
type Props = EditorSessionSource & { language?: string; className?: string };

export function CollaborativeCodeEditor({ className, ...props }: Props) {
    const documentKey = JSON.stringify([props.kind, props.roomId]);
    return (
        <section
            aria-label="Совместный редактор"
            className={cn(
                'bg-card border-border flex h-full min-h-0 min-w-0 flex-col overflow-hidden rounded-md border',
                className,
            )}
        >
            <EditorBoundary key={documentKey}>
                <CollaborationEditor {...props} />
            </EditorBoundary>
        </section>
    );
}
