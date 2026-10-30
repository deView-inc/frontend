'use client';

import { useMediaDeviceSelect } from '@livekit/components-react';
import {
    CaretDownIcon,
    MicrophoneIcon,
    SlidersHorizontalIcon,
    SpeakerHighIcon,
    VideoCameraIcon,
} from '@phosphor-icons/react';
import type { ReactNode } from 'react';
import { Button } from '~&/shared/ui/button';

import { Card, SectionHeader } from './shared';

type DeviceKind = 'audioinput' | 'videoinput' | 'audiooutput';

export function DevicesSettings() {
    return (
        <>
            <SectionHeader
                icon={
                    <SlidersHorizontalIcon
                        size={16}
                        className="text-primary"
                    />
                }
                title="Устройства"
                hint="Выбор микрофона, камеры и динамиков. Переключение работает на ходу."
            />

            <div className="flex flex-col gap-2">
                <DeviceBlock
                    kind="audioinput"
                    title="Микрофон"
                    icon={<MicrophoneIcon size={14} />}
                />
                <DeviceBlock
                    kind="videoinput"
                    title="Камера"
                    icon={<VideoCameraIcon size={14} />}
                />
                <DeviceBlock
                    kind="audiooutput"
                    title="Динамики"
                    icon={<SpeakerHighIcon size={14} />}
                    withTest
                />
            </div>
        </>
    );
}

const canSelectOutput = () =>
    typeof HTMLMediaElement !== 'undefined' && 'setSinkId' in HTMLMediaElement.prototype;

async function playTestSound(deviceId?: string) {
    const ctx = new AudioContext();

    try {
        const sink = ctx as AudioContext & { setSinkId?: (id: string) => Promise<void> };
        if (deviceId && sink.setSinkId) {
            await sink.setSinkId(deviceId);
        }
    } catch {
        // Устройство недоступно, играем на текущем
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const t = ctx.currentTime;

    osc.frequency.value = 660;
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.2, t + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);

    osc.connect(gain).connect(ctx.destination);
    osc.onended = () => void ctx.close();
    osc.start();
    osc.stop(t + 0.65);
}

function DeviceBlock({
    kind,
    title,
    icon,
    withTest,
}: {
    kind: DeviceKind;
    title: string;
    icon: ReactNode;
    withTest?: boolean;
}) {
    const { devices, activeDeviceId, setActiveMediaDevice } = useMediaDeviceSelect({
        kind,
        requestPermissions: false,
    });

    const unsupported = kind === 'audiooutput' && !canSelectOutput();
    const available = !unsupported && devices.length > 0;

    return (
        <Card className="flex flex-col gap-2">
            <div className="flex items-center gap-2 font-mono text-[9.5px] tracking-[0.76px] uppercase">
                {icon}
                <div className="text-muted-foreground">{title}</div>
            </div>

            {available ? (
                <div className="flex gap-1.5">
                    <div className="relative flex-1">
                        <select
                            value={activeDeviceId}
                            onChange={(e) => void setActiveMediaDevice(e.target.value)}
                            className="bg-card border-border text-foreground focus-visible:border-primary h-8 w-full appearance-none truncate rounded-lg border pr-8 pl-2.5 text-xs font-medium outline-none"
                        >
                            {devices.map((d, i) => (
                                <option
                                    key={d.deviceId}
                                    value={d.deviceId}
                                >
                                    {d.label || `Устройство ${i + 1}`}
                                </option>
                            ))}
                        </select>
                        <CaretDownIcon
                            size={12}
                            className="text-foreground-muted pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2"
                        />
                    </div>

                    {withTest && (
                        <Button
                            variant="secondary"
                            className="h-8 px-3 text-xs"
                            onClick={() => void playTestSound(activeDeviceId)}
                        >
                            Проверить
                        </Button>
                    )}
                </div>
            ) : (
                <p className="text-muted-foreground text-xs">
                    {unsupported
                        ? 'Этот браузер не умеет выбирать динамики. Выбор доступен в Chrome и Edge.'
                        : 'Устройства не найдены. Проверьте разрешения браузера.'}
                </p>
            )}
        </Card>
    );
}
