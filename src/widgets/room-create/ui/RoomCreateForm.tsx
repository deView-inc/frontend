'use client';

import { useRoomCreateForm } from '../model/useRoomCreateForm';
import { RoomCreateFields } from './parts/RoomCreateFields';
import { RoomCreatePreview } from './parts/RoomCreatePreview';

export function RoomCreateForm() {
    const form = useRoomCreateForm();

    return (
        <form
            className="flex min-h-0 flex-1 flex-col gap-4 xl:flex-row xl:items-start"
            onSubmit={form.handleSubmit}
        >
            <RoomCreateFields {...form} />
            <RoomCreatePreview {...form} />
        </form>
    );
}
