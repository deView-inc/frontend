import React from 'react';
import { RoomLayout } from '~&/app/layouts/RoomLayout';
import { VideoRoomProvider } from '~&/entities/video-room';

interface ProtectedRoomLayoutProps extends React.PropsWithChildren {
    params: Promise<{ roomId: string }>;
}

export default async function ProtectedRoomLayout({ children, params }: ProtectedRoomLayoutProps) {
    const { roomId } = await params;

    return (
        <VideoRoomProvider roomId={roomId}>
            <RoomLayout>{children}</RoomLayout>
        </VideoRoomProvider>
    );
}
