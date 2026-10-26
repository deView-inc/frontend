import type { OnMount } from '@monaco-editor/react';
import { useCallback, useEffect, useEffectEvent, useRef, useState } from 'react';

import { loader, workerErrorEvent } from '../monaco/setup';
import type { CodeEditorProps } from '../types';

type MountedEditor = Parameters<OnMount>;
type LifecycleProps = Pick<CodeEditorProps, 'onReady' | 'onError'>;

function useEditorResources() {
    const instance = useRef<MountedEditor[0] | null>(null);
    const cleanup = useRef<(() => void) | null>(null);
    const [error, setError] = useState(false);
    const [mounted, setMounted] = useState<MountedEditor | null>(null);

    const release = useCallback(() => {
        const dispose = cleanup.current;
        cleanup.current = null;
        dispose?.();
    }, []);

    const fail = useCallback(() => {
        release();
        instance.current?.updateOptions({ readOnly: true, domReadOnly: true });
        setError(true);
    }, [release]);

    const handleMount = useCallback<OnMount>((editor, api) => {
        instance.current = editor;
        setMounted([editor, api]);
    }, []);

    const connect = useCallback(
        (editor: MountedEditor, onReady: CodeEditorProps['onReady']) => {
            try {
                cleanup.current = onReady(...editor);
            } catch {
                fail();
            }
        },
        [fail],
    );

    const detach = useCallback(() => {
        release();
        instance.current = null;
    }, [release]);

    return { mounted, error, release, fail, handleMount, connect, detach };
}

function useMonacoInitialization({ fail, release }: ReturnType<typeof useEditorResources>) {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        let active = true;
        const onWorkerError = () => {
            if (active) {
                fail();
            }
        };
        window.addEventListener(workerErrorEvent, onWorkerError);
        // The wrapper only logs loader failures. Observe initialization to show retry UI.
        loader
            .init()
            .then(() => {
                if (active) {
                    setLoaded(true);
                }
            })
            .catch(onWorkerError);
        return () => {
            active = false;
            window.removeEventListener(workerErrorEvent, onWorkerError);
            release();
        };
    }, [fail, release]);
    return loaded;
}

function useEditorBinding(
    { mounted, error, release, connect, detach }: ReturnType<typeof useEditorResources>,
    onReady: CodeEditorProps['onReady'],
) {
    useEffect(() => {
        const model = mounted?.[0].getModel();
        if (!mounted || error || !model || model.isDisposed()) {
            return;
        }
        // OnMount ignores returned cleanup. Release before the wrapper disposes its model.
        const disposal = model.onWillDispose(detach);
        connect(mounted, onReady);
        return () => {
            release();
            disposal.dispose();
        };
    }, [mounted, error, onReady, connect, release, detach]);
}

export function useEditorLifecycle({ onReady, onError }: LifecycleProps) {
    const resources = useEditorResources();
    const { error, handleMount } = resources;
    const loaded = useMonacoInitialization(resources);
    const notifyError = useEffectEvent(() => onError?.());
    useEditorBinding(resources, onReady);
    useEffect(() => {
        if (error) {
            notifyError();
        }
    }, [error]);
    return { loaded, error, handleMount };
}
