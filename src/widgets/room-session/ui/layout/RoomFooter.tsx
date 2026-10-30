'use client';

import { useIsSpeaking, useLocalParticipant, useTrackToggle } from '@livekit/components-react';
import {
    ArrowsInSimpleIcon,
    ClipboardTextIcon,
    MicrophoneIcon,
    MicrophoneSlashIcon,
    MonitorArrowUpIcon,
    SparkleIcon,
    VideoCameraIcon,
    VideoCameraSlashIcon,
} from '@phosphor-icons/react';
import { Track } from 'livekit-client';
import { cn } from '~&/shared/lib/utils';
import { Button } from '~&/shared/ui/button';
import { useTaskPanel } from '~&/widgets/room-session';

const OFF_STYLE = 'bg-red-500/15 text-red-500';

export const RoomFooter = () => {
    const { isVisible, setIsVisible } = useTaskPanel();

    const mic = useTrackToggle({ source: Track.Source.Microphone });
    const cam = useTrackToggle({ source: Track.Source.Camera });
    const screen = useTrackToggle({ source: Track.Source.ScreenShare });
    const { localParticipant } = useLocalParticipant();
    const isSpeaking = useIsSpeaking(localParticipant);
    return (
        <div className="bg-background inline-flex justify-center gap-3 py-3">
            <Button
                variant="secondary"
                disabled={mic.pending}
                className={cn(
                    'transition-shadow',
                    !mic.enabled && OFF_STYLE,
                    mic.enabled && isSpeaking && 'ring-primary/60 ring-2',
                )}
                aria-label={mic.enabled ? 'Выключить микрофон' : 'Включить микрофон'}
                onClick={() => void mic.toggle()}
            >
                {mic.enabled ? (
                    <MicrophoneIcon
                        size={32}
                        weight="fill"
                    />
                ) : (
                    <MicrophoneSlashIcon
                        size={32}
                        weight="fill"
                    />
                )}
            </Button>

            <Button
                variant="secondary"
                disabled={cam.pending}
                className={cn(!cam.enabled && OFF_STYLE)}
                aria-label={cam.enabled ? 'Выключить камеру' : 'Включить камеру'}
                onClick={() => void cam.toggle()}
            >
                {cam.enabled ? (
                    <VideoCameraIcon
                        size={32}
                        weight="fill"
                    />
                ) : (
                    <VideoCameraSlashIcon
                        size={32}
                        weight="fill"
                    />
                )}
            </Button>

            <Button
                variant="secondary"
                disabled={screen.pending}
                className={cn(screen.enabled && 'border-primary/40 bg-primary/12 text-primary')}
                aria-label={screen.enabled ? 'Остановить показ экрана' : 'Показать экран'}
                onClick={() => void screen.toggle()}
            >
                <MonitorArrowUpIcon
                    size={32}
                    weight="bold"
                />
            </Button>

            <Button
                className="border-primary/40 bg-primary/12 text-primary border"
                onClick={() => setIsVisible(!isVisible)}
            >
                {isVisible ? (
                    <>
                        <ArrowsInSimpleIcon size={32} />
                        <span>Скрыть зону решения</span>
                    </>
                ) : (
                    <>
                        <ClipboardTextIcon
                            size={18}
                            className="text-primary"
                        />
                        <span>Открыть задачу</span>
                    </>
                )}
            </Button>

            <Button
                disabled
                variant="secondary"
            >
                <SparkleIcon
                    size={32}
                    weight="fill"
                />
                ИИ-подсказка
            </Button>
        </div>
    );
};
