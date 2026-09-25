'use client';

import { useEffect, useState } from 'react';

const pad = (n: number) => String(n).padStart(2, '0');

function format(totalSeconds: number) {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

export function Timer({ className }: { className?: string }) {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setSeconds((s) => s + 1), 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className={className}>
            <span className="text-destructive flex items-center gap-1">
                <span className="bg-destructive animate-blink-caret size-2 rounded-full" />
                REC
            </span>
            <span>{format(seconds)}</span>
        </div>
    );
}
