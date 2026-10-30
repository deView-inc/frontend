'use client';

import { VideoTrack, useTracks, type TrackReference } from '@livekit/components-react';
import { CaretLeftIcon, CaretRightIcon, MonitorPlayIcon, XIcon } from '@phosphor-icons/react';
import { Track } from 'livekit-client';
import { useEffect, useMemo, useState } from 'react';
import { ParticipantTile } from '~&/entities/video-room';
import { useElementSize } from '~&/shared/lib/hooks';
import { cn, fitTiles } from '~&/shared/lib/utils';

const GAP = 12;
const PAGE_SIZE = 25;
const STRIP_GAP = 8;
const STRIP_MAX_H = 130;

export function VideoGrid() {
    const tracks = useTracks(
        [
            { source: Track.Source.Camera, withPlaceholder: true },
            { source: Track.Source.Microphone, withPlaceholder: true },
            { source: Track.Source.ScreenShare, withPlaceholder: false },
        ],
        { onlySubscribed: false },
    );

    const [gridRef, gridSize] = useElementSize<HTMLDivElement>();
    const [stripRef, stripSize] = useElementSize<HTMLDivElement>();
    const [page, setPage] = useState(0);
    const [watching, setWatching] = useState<string | null>(null);

    const { participants, screenShares } = useMemo(() => {
        const map = new Map<string, typeof tracks>();
        const screens: TrackReference[] = [];

        for (const t of tracks) {
            if (t.source === Track.Source.ScreenShare) {
                if (t.publication) {
                    screens.push(t as TrackReference);
                }
                continue;
            }
            const id = t.participant.identity;
            if (!map.has(id)) {
                map.set(id, []);
            }
            map.get(id)!.push(t);
        }

        const list = [...map.entries()].sort(
            ([, a], [, b]) => Number(b[0].participant.isLocal) - Number(a[0].participant.isLocal),
        );
        return { participants: list, screenShares: screens };
    }, [tracks]);

    const sharerIds = useMemo(
        () => new Set(screenShares.map((s) => s.participant.identity)),
        [screenShares],
    );
    const stage = watching
        ? screenShares.find((s) => s.participant.identity === watching)
        : undefined;

    // Если тот, кого смотрели, остановил показ — сбрасываем выбор
    useEffect(() => {
        if (watching && !stage) {
            setWatching(null);
        }
    }, [watching, stage]);

    const pageCount = Math.max(1, Math.ceil(participants.length / PAGE_SIZE));
    const safePage = Math.min(page, pageCount - 1);
    useEffect(() => {
        if (page !== safePage) {
            setPage(safePage);
        }
    }, [page, safePage]);

    const visible = participants.slice(safePage * PAGE_SIZE, (safePage + 1) * PAGE_SIZE);
    const tile = useMemo(
        () => fitTiles(visible.length, gridSize.width, gridSize.height, GAP, 16 / 9),
        [visible.length, gridSize.width, gridSize.height],
    );
    const stripTile = useMemo(
        () => fitTiles(participants.length, stripSize.width, STRIP_MAX_H, STRIP_GAP, 16 / 9, 200),
        [participants.length, stripSize.width],
    );

    const nameOf = (s: TrackReference) =>
        s.participant.isLocal ? 'Ваш экран' : s.participant.name || s.participant.identity;

    if (stage) {
        return (
            <div className="flex h-full w-full flex-col gap-3 px-5 py-4">
                <div className="flex shrink-0 flex-wrap items-center gap-2">
                    {screenShares.map((s) => {
                        const active = s.participant.identity === watching;
                        return (
                            <button
                                key={s.participant.identity}
                                type="button"
                                onClick={() => setWatching(s.participant.identity)}
                                className={cn(
                                    'flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition',
                                    active
                                        ? 'border-primary/50 bg-primary/15 text-primary'
                                        : 'border-border bg-card text-muted-foreground hover:text-foreground',
                                )}
                            >
                                <MonitorPlayIcon
                                    size={14}
                                    weight="fill"
                                />
                                {nameOf(s)}
                            </button>
                        );
                    })}

                    <button
                        type="button"
                        onClick={() => setWatching(null)}
                        className="border-border bg-card text-muted-foreground hover:text-foreground ml-auto flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium"
                    >
                        <XIcon size={14} />
                        Закрыть экран
                    </button>
                </div>

                <div className="border-border relative min-h-0 flex-1 overflow-hidden rounded-2xl border bg-black">
                    <VideoTrack
                        trackRef={stage}
                        className="h-full w-full object-contain"
                    />
                    <div className="border-border absolute bottom-2 left-2 rounded-[9px] border bg-black/70 px-3 py-2 text-xs font-medium backdrop-blur-sm">
                        {nameOf(stage)}
                    </div>
                </div>

                <div
                    ref={stripRef}
                    className="flex shrink-0 flex-wrap justify-center"
                    style={{ gap: STRIP_GAP }}
                >
                    {stripTile.w > 0 &&
                        participants.map(([identity, refs]) => (
                            <ParticipantTile
                                key={identity}
                                trackRefs={refs}
                                style={{ width: stripTile.w, height: stripTile.h }}
                            />
                        ))}
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-full w-full flex-col px-5 py-4">
            <div
                ref={gridRef}
                className="flex min-h-0 flex-1 flex-wrap content-center items-center justify-center"
                style={{ gap: GAP }}
            >
                {tile.w > 0 &&
                    visible.map(([identity, refs]) => (
                        <ParticipantTile
                            key={identity}
                            trackRefs={refs}
                            style={{ width: tile.w, height: tile.h }}
                            sharing={sharerIds.has(identity)}
                            onWatch={() => setWatching(identity)}
                        />
                    ))}
            </div>

            {pageCount > 1 && (
                <div className="flex items-center justify-center gap-3 pt-3">
                    <button
                        onClick={() => setPage((p) => Math.max(0, p - 1))}
                        disabled={safePage === 0}
                        className="bg-card border-border rounded-full border p-2 disabled:opacity-40"
                    >
                        <CaretLeftIcon size={16} />
                    </button>
                    <span className="text-muted-foreground text-sm tabular-nums">
                        {safePage + 1} / {pageCount}
                    </span>
                    <button
                        onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
                        disabled={safePage === pageCount - 1}
                        className="bg-card border-border rounded-full border p-2 disabled:opacity-40"
                    >
                        <CaretRightIcon size={16} />
                    </button>
                </div>
            )}
        </div>
    );
}
