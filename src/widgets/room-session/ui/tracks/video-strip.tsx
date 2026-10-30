'use client';

import { VideoTrack, isTrackReference, useTracks } from '@livekit/components-react';
import { MicrophoneSlashIcon } from '@phosphor-icons/react';
import { Track } from 'livekit-client';
import { useElementSize } from '~&/shared/lib/hooks';
import { fitTiles, getInitials } from '~&/shared/lib/utils';

const GAP = 6;
const MAX_H = 170;
const MAX_W = 150;

export function VideoStrip() {
    const trackRefs = useTracks([{ source: Track.Source.Camera, withPlaceholder: true }], {
        onlySubscribed: false,
    });
    const [innerRef, { width }] = useElementSize<HTMLDivElement>();

    const tile = fitTiles(trackRefs.length, width, MAX_H, GAP, 1, MAX_W);
    const showName = tile.w >= 90;
    const avatarSize = Math.round(tile.w * 0.42);

    return (
        <div className="border-border bg-card border-b border-l p-3">
            <div
                ref={innerRef}
                className="flex w-full flex-wrap content-start"
                style={{ gap: GAP }}
            >
                {tile.w > 0 &&
                    trackRefs.map((ref) => {
                        const fullName = ref.participant.name || ref.participant.identity;
                        const displayName = ref.participant.isLocal ? 'Вы' : fullName;
                        const audioMuted =
                            ref.participant.getTrackPublication(Track.Source.Microphone)?.isMuted ??
                            true;
                        const hasVideo = isTrackReference(ref) && !ref.publication.isMuted;

                        return (
                            <div
                                key={ref.participant.identity}
                                title={displayName}
                                style={{ width: tile.w, height: tile.h }}
                                className="border-border relative shrink-0 overflow-hidden rounded-[9px] border bg-[#0f1216]"
                            >
                                {hasVideo ? (
                                    <VideoTrack
                                        trackRef={ref}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="grid h-full w-full place-items-center bg-linear-to-br from-[#12171b] via-[#0d1114] to-[#141a1e]">
                                        <span
                                            style={{
                                                width: avatarSize,
                                                height: avatarSize,
                                                fontSize: Math.max(8, avatarSize * 0.38),
                                            }}
                                            className="bg-primary/15 text-primary grid place-items-center rounded-full font-semibold"
                                        >
                                            {getInitials(fullName)}
                                        </span>
                                    </div>
                                )}

                                {showName ? (
                                    <div className="absolute inset-x-1 bottom-1 flex items-center justify-between rounded-[6px] bg-black/70 px-2 py-1">
                                        <span className="text-foreground truncate text-xs font-medium">
                                            {displayName}
                                        </span>
                                        {audioMuted && (
                                            <MicrophoneSlashIcon
                                                size={11}
                                                className="text-foreground shrink-0"
                                            />
                                        )}
                                    </div>
                                ) : (
                                    audioMuted && (
                                        <MicrophoneSlashIcon
                                            size={10}
                                            weight="fill"
                                            className="absolute right-1 bottom-1 text-red-500"
                                        />
                                    )
                                )}
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
