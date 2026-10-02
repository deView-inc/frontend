'use client';

import {
    VideoTrack,
    useIsSpeaking,
    type TrackReference,
    type TrackReferenceOrPlaceholder,
} from '@livekit/components-react';
import { MicrophoneSlashIcon } from '@phosphor-icons/react';
import { Track } from 'livekit-client';
import { cn } from '~&/shared/lib/utils';

interface Props {
    trackRefs: TrackReferenceOrPlaceholder[];
}

export function ParticipantTile({ trackRefs }: Props) {
    const videoRef = trackRefs.find(
        (t): t is TrackReference => t.source === Track.Source.Camera && t.publication !== undefined,
    );

    const audioRef = trackRefs.find((t) => t.source === Track.Source.Microphone);

    const participant = trackRefs[0]?.participant;
    const isSpeaking = useIsSpeaking(participant);
    const isMicMuted = !audioRef || audioRef.publication?.isMuted;

    return (
        <div
            className={cn(
                'relative aspect-video overflow-hidden rounded-xl bg-card',
                isSpeaking && 'ring-2 ring-primary',
            )}
        >
            {videoRef && !videoRef.publication.isMuted ? (
                <VideoTrack
                    trackRef={videoRef}
                    className="h-full w-full object-cover"
                />
            ) : (
                <div className="bg-card/80 text-foreground-light flex h-full w-full items-center justify-center text-sm">
                    {participant?.identity}
                </div>
            )}

            <div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-md bg-black/50 px-2 py-1 text-xs text-white">
                {isMicMuted && <MicrophoneSlashIcon size={14} />}
                {participant?.identity}
            </div>
        </div>
    );
}
