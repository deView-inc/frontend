'use client';

import {
    VideoTrack,
    useIsSpeaking,
    useParticipantAttributes,
    type TrackReference,
    type TrackReferenceOrPlaceholder,
} from '@livekit/components-react';
import { MicrophoneIcon, MicrophoneSlashIcon, MonitorPlayIcon } from '@phosphor-icons/react';
import { Track } from 'livekit-client';
import type { CSSProperties } from 'react';
import { cn } from '~&/shared/lib/utils';

interface Props {
    trackRefs: TrackReferenceOrPlaceholder[];
    style?: CSSProperties;
    sharing?: boolean;
    onWatch?: () => void;
}

const ROLE_LABEL: Record<string, string> = {
    interviewer: 'интервьюер',
    candidate: 'кандидат',
};

export function ParticipantTile({ trackRefs, style, sharing, onWatch }: Props) {
    const videoRef = trackRefs.find(
        (t): t is TrackReference => t.source === Track.Source.Camera && t.publication !== undefined,
    );
    const audioRef = trackRefs.find((t) => t.source === Track.Source.Microphone);

    const participant = trackRefs[0]?.participant;
    const isSpeaking = useIsSpeaking(participant);
    const { attributes } = useParticipantAttributes({ participant });

    const isMicMuted = !audioRef || audioRef.publication?.isMuted;
    const cameraOn = videoRef && !videoRef.publication.isMuted;

    const name = participant?.isLocal ? 'Вы' : participant?.name || participant?.identity;
    const role = attributes?.role ? ROLE_LABEL[attributes.role] : undefined;
    const initial = (participant?.name || participant?.identity || '?').trim()[0]?.toUpperCase();

    return (
        <div
            style={style}
            className={cn(
                'bg-card @container relative shrink-0 overflow-hidden rounded-2xl border transition-shadow duration-200',
                isSpeaking
                    ? 'border-primary/60 ring-primary/40 ring-2'
                    : 'border-border ring-0 ring-transparent',
            )}
        >
            {cameraOn ? (
                <VideoTrack
                    trackRef={videoRef}
                    className={cn(
                        'h-full w-full object-cover',
                        participant?.isLocal && '-scale-x-100',
                    )}
                />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(ellipse_at_center,rgba(140,170,190,0.16)_0%,rgba(70,85,95,0.08)_25%,transparent_50%)]">
                    <div className="bg-muted text-foreground flex aspect-square h-[28%] min-h-10 items-center justify-center rounded-full text-[clamp(16px,4cqw,40px)] font-semibold">
                        {initial}
                    </div>
                </div>
            )}

            <div className="border-border absolute bottom-2 left-2 flex max-w-[calc(100%-1rem)] items-center gap-[7px] rounded-[9px] border bg-black/70 px-[10px] py-[6px] backdrop-blur-sm">
                {isMicMuted ? (
                    <MicrophoneSlashIcon
                        size={13}
                        weight="fill"
                        className="shrink-0 text-red-500"
                    />
                ) : (
                    <MicrophoneIcon
                        size={13}
                        weight="fill"
                        className="text-primary shrink-0"
                    />
                )}
                <span className="text-foreground truncate text-[12.5px] font-medium">
                    {name}
                    {role && ` · ${role}`}
                </span>
            </div>
            {sharing && onWatch && (
                <button
                    type="button"
                    onClick={onWatch}
                    className="bg-primary text-primary-foreground absolute top-2 right-2 flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold shadow-lg transition hover:brightness-110"
                >
                    <MonitorPlayIcon
                        size={14}
                        weight="fill"
                    />
                    Смотреть
                </button>
            )}
        </div>
    );
}
