'use client';

import { useTracks } from '@livekit/components-react';
import { Track } from 'livekit-client';
import { ParticipantTile } from '~&/entities/video-room/ui/participant-tile';

export function VideoGrid() {
    const trackRefs = useTracks([Track.Source.Camera, Track.Source.Microphone], {
        onlySubscribed: false,
    });

    const byParticipant = new Map<string, typeof trackRefs>();
    for (const ref of trackRefs) {
        const id = ref.participant.identity;
        if (!byParticipant.has(id)) {
            byParticipant.set(id, []);
        }
        byParticipant.get(id)!.push(ref);
    }

    return (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {[...byParticipant.entries()].map(([identity, refs]) => (
                <ParticipantTile
                    key={identity}
                    trackRefs={refs}
                />
            ))}
        </div>
    );
}
