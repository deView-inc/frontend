import React from 'react';
import { RoomLayout } from '~&/app/layouts/RoomLayout';

export default async function ProtectedRoomLayout({ children }: React.PropsWithChildren) {
    return (
        <>
            <RoomLayout>{children}</RoomLayout>
        </>
    );
}
