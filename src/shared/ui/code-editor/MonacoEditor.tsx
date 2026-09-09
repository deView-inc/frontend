'use client';
import { useCallback, useState } from 'react';

import { EditorAttempt } from './components/EditorAttempt';
import type { CodeEditorProps } from './types';

export default function MonacoEditor(props: CodeEditorProps) {
    const [attempt, setAttempt] = useState(0);
    const handleRetry = useCallback(() => setAttempt((value) => value + 1), []);
    return (
        <div className="relative h-full min-h-[280px] min-w-0 flex-1">
            <EditorAttempt
                key={attempt}
                {...props}
                onRetry={handleRetry}
            />
        </div>
    );
}
