// Src/app/test-room/page.tsx
'use client';

import { Room, RoomEvent, Track } from 'livekit-client';
import { useEffect, useState } from 'react';

export default function TestRoomPage() {
    const [status, setStatus] = useState('connecting');

    useEffect(() => {
        const room = new Room();

        room.on(RoomEvent.TrackSubscribed, (track) => {
            if (track.kind === Track.Kind.Video) {
                const el = track.attach();
                document.getElementById('remote')?.appendChild(el);
            }
        });

        room.on(RoomEvent.Connected, () => setStatus('connected'));
        room.on(RoomEvent.Disconnected, () => setStatus('disconnected'));

        (async () => {
            const res = await fetch('/api/livekit/token?roomId=test123');
            const { token, wsUrl } = await res.json();

            await room.connect(wsUrl, token);
            await room.localParticipant.enableCameraAndMicrophone();

            const localTrack = [...room.localParticipant.videoTrackPublications.values()][0]?.track;
            if (localTrack) {
                document.getElementById('local')?.appendChild(localTrack.attach());
            }
        })();

        return () => {
            room.disconnect();
        };
    }, []);

    return (
        <div>
            <p>Статус: {status}</p>
            <div style={{ display: 'flex', gap: 16 }}>
                <div>
                    <p>Локально (ты)</p>
                    <div
                        id="local"
                        style={{ width: 320, height: 240, background: '#000' }}
                    />
                </div>
                <div>
                    <p>Удалённо (собеседник)</p>
                    <div
                        id="remote"
                        style={{ width: 320, height: 240, background: '#000' }}
                    />
                </div>
            </div>
        </div>
    );
}
