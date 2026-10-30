'use client';

import { isTrackReference, useTracks, VideoTrack } from '@livekit/components-react';
import { Track } from 'livekit-client';

export function ScreenShareStage() {
    const tracks = useTracks([Track.Source.ScreenShare], { onlySubscribed: false }).filter(
        isTrackReference,
    );

    if (tracks.length === 0) {
        return null;
    }

    const ref = tracks[tracks.length - 1];

    return (
        <div className="bg-card relative min-h-0 flex-1 overflow-hidden rounded-xl">
            <VideoTrack
                trackRef={ref}
                className="h-full w-full object-contain"
            />
            <div className="absolute bottom-2 left-2 rounded-md bg-black/50 px-2 py-1 text-xs text-white">
                Экран: {ref.participant.name ?? ref.participant.identity}
            </div>
        </div>
    );
}
