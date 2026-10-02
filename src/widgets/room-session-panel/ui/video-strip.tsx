'use client';
import { useTracks, VideoTrack } from '@livekit/components-react';
import { MicrophoneSlashIcon } from '@phosphor-icons/react';
import { Track } from 'livekit-client';

export function VideoStrip() {
    const trackRefs = useTracks([Track.Source.Camera], { onlySubscribed: false });

    return (
        <div className="border-border bg-card flex gap-2 border-b border-l p-3">
            {trackRefs.map((ref) => {
                const audioMuted =
                    ref.participant.getTrackPublication(Track.Source.Microphone)?.isMuted ?? true;

                return (
                    <div
                        key={ref.participant.identity}
                        className="border-border relative h-[115px] flex-1 overflow-hidden rounded-[11px] border bg-[#0f1216]"
                    >
                        {!ref.publication?.isMuted ? (
                            <VideoTrack
                                trackRef={ref}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="h-full w-full bg-gradient-to-br from-[#12171b] via-[#0d1114] to-[#141a1e]" />
                        )}

                        <div className="absolute inset-x-[7px] bottom-[7px] flex items-center justify-between rounded-[7px] bg-black/72 px-[7px] py-1">
                            <span className="text-foreground truncate text-[10.5px] font-medium">
                                {ref.participant.name ?? ref.participant.identity}
                            </span>
                            {audioMuted && (
                                <MicrophoneSlashIcon
                                    size={12}
                                    className="text-foreground shrink-0"
                                />
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
