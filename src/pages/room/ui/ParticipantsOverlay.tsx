'use client';

import { useTaskPanel, VideoGrid } from '~&/widgets/room-session';

export function ParticipantsOverlay() {
    const { isVisible } = useTaskPanel();

    if (isVisible) {
        return null;
    }

    return (
        <section
            aria-label="Участники"
            className="bg-card absolute inset-0 z-10 overflow-hidden"
        >
            <VideoGrid />
        </section>
    );
}
