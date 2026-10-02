'use client';

import { useLocalParticipant, useRoomContext } from '@livekit/components-react';
import {
    MicrophoneIcon,
    MicrophoneSlashIcon,
    VideoCameraIcon,
    VideoCameraSlashIcon,
    SignOutIcon,
} from '@phosphor-icons/react';
import Link from 'next/link';
import { useRoomSlug } from '~&/shared/lib/hooks';
import { Button } from '~&/shared/ui';

export function RoomControls() {
    const room = useRoomContext();
    const { localParticipant, isMicrophoneEnabled, isCameraEnabled } = useLocalParticipant();

    const roomSlug = useRoomSlug();

    return (
        <div className="inline-flex items-center gap-3">
            <Button
                variant={isMicrophoneEnabled ? 'secondary' : 'destructive'}
                onClick={() => localParticipant.setMicrophoneEnabled(!isMicrophoneEnabled)}
            >
                {isMicrophoneEnabled ? (
                    <MicrophoneIcon size={20} />
                ) : (
                    <MicrophoneSlashIcon size={20} />
                )}
            </Button>

            <Button
                variant={isCameraEnabled ? 'secondary' : 'destructive'}
                onClick={() => localParticipant.setCameraEnabled(!isCameraEnabled)}
            >
                {isCameraEnabled ? (
                    <VideoCameraIcon size={20} />
                ) : (
                    <VideoCameraSlashIcon size={20} />
                )}
            </Button>

            <Button
                variant="destructive"
                nativeButton={false}
                render={<Link href={`/room/${roomSlug}/summary`} />}
                onClick={() => room.disconnect()}
            >
                <SignOutIcon size={20} />
                Завершить
            </Button>
        </div>
    );
}
