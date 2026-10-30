'use client';

import { RoomAudioRenderer, RoomContext } from '@livekit/components-react';
import { Room } from 'livekit-client';
import { type PropsWithChildren, useEffect, useState } from 'react';
import { apiRequest } from '~&/shared/api';
import { ChatProvider } from '~&/widgets/room-session';

type Props = PropsWithChildren<{
    roomId: string;
}>;

interface RoomTokenResponse {
    token: string;
    wsUrl: string;
}

type Status = 'connecting' | 'connected' | 'error';

export function VideoRoomProvider({ roomId, children }: Props) {
    const [room] = useState(() => new Room({ adaptiveStream: true, dynacast: true }));
    const [status, setStatus] = useState<Status>('connecting');
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        let cancelled = false;
        const t0 = performance.now();
        // Временно: замеры, удалить после диагностики
        const log = (step: string) =>
            console.debug(`[room] ${step}: ${Math.round(performance.now() - t0)} ms`);

        setStatus('connecting');

        async function connect() {
            const { token, wsUrl } = await apiRequest<RoomTokenResponse>(
                `/v1/rooms/${roomId}/token`,
                { auth: true, method: 'POST' },
            );
            log('token получен');

            if (cancelled) {
                return;
            }

            await room.connect(wsUrl, token);
            log('connect готов');

            if (cancelled) {
                await room.disconnect();
                return;
            }

            setStatus('connected');

            // Устройства включаем в фоне и параллельно, показ комнаты на них не ждёт
            void room.localParticipant
                .setMicrophoneEnabled(true)
                .then(() => log('микрофон включён'))
                .catch((e) => console.warn('Микрофон недоступен', e));
            void room.localParticipant
                .setCameraEnabled(true)
                .then(() => log('камера включена'))
                .catch((e) => console.warn('Камера недоступна', e));
        }

        void connect().catch((error) => {
            console.error('Ошибка подключения к комнате', error);
            if (!cancelled) {
                setStatus('error');
            }
        });

        return () => {
            cancelled = true;
            void room.disconnect().catch((error) => {
                console.error('Ошибка отключения от комнаты', error);
            });
        };
    }, [room, roomId, attempt]);

    if (status === 'error') {
        return (
            <div
                role="alert"
                className="text-foreground grid h-svh place-items-center text-sm"
            >
                <p>
                    Не удалось подключиться к комнате.{' '}
                    <button
                        type="button"
                        className="underline"
                        onClick={() => setAttempt((n) => n + 1)}
                    >
                        Повторить
                    </button>
                </p>
            </div>
        );
    }

    if (status === 'connecting') {
        return (
            <div className="text-foreground-muted grid h-svh place-items-center text-sm">
                Подключение к комнате…
            </div>
        );
    }

    return (
        <RoomContext.Provider value={room}>
            <RoomAudioRenderer />
            <ChatProvider>{children}</ChatProvider>
        </RoomContext.Provider>
    );
}
