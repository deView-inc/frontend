'use client';

import { RoomContext } from '@livekit/components-react';
import { Room } from 'livekit-client';
import { type PropsWithChildren, useEffect, useState } from 'react';
import { apiRequest } from '~&/shared/api';

type Props = PropsWithChildren<{
    roomId: string;
}>;

interface RoomTokenResponse {
    token: string;
    wsUrl: string;
}

export function VideoRoomProvider({ roomId, children }: Props) {
    const [room] = useState(() => new Room({ adaptiveStream: true, dynacast: true }));
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        let cancelled = false;

        async function connect() {
            const { token, wsUrl } = await apiRequest<RoomTokenResponse>(
                `/v1/rooms/${roomId}/token`,
                { auth: true, method: 'POST' },
            );

            if (cancelled) {
                return;
            }

            await room.connect(wsUrl, token);
            await room.localParticipant.enableCameraAndMicrophone();
            setIsConnected(true);
        }

        void connect().catch((error) => {
            console.error('Ошибка подключения к комнате', error);
        });

        return () => {
            cancelled = true;
            void room.disconnect().catch((error) => {
                console.error('Ошибка отключения от комнаты', error);
            });
        };
    }, [room, roomId]);

    if (!isConnected) {
        return null;
    }

    return <RoomContext.Provider value={room}>{children}</RoomContext.Provider>;
}
