'use client';
import dynamic from 'next/dynamic';

import { EditorLoading } from './components/EditorLoading';

export const CodeEditor = dynamic(() => import('./MonacoEditor'), {
    ssr: false,
    loading: EditorLoading,
});
