import type { Awareness } from 'y-protocols/awareness';

export function bindEditorPresence(
    awareness: Awareness,
    onParticipantsChange: (count: number) => void,
) {
    const style = document.createElement('style');
    document.head.append(style);
    let participantColors: Map<number, string> | null = null;

    const renderPresence = () => {
        const nextColors = new Map<number, string>();
        awareness.getStates().forEach((value, id) => {
            const color = value.user?.color;
            nextColors.set(
                id,
                typeof color === 'string' && /^#[0-9a-f]{6}$/i.test(color)
                    ? color.toLowerCase()
                    : '#a78bfa',
            );
        });
        // Cursor updates do not change styles; compare colors independently of map order.
        if (
            participantColors?.size === nextColors.size &&
            [...nextColors].every(([id, color]) => participantColors?.get(id) === color)
        ) {
            return;
        }
        if (participantColors?.size !== nextColors.size) {
            onParticipantsChange(nextColors.size);
        }
        participantColors = nextColors;
        style.textContent = [...nextColors]
            .map(
                ([id, color]) =>
                    `.yRemoteSelection-${id}{background:${color}33}.yRemoteSelectionHead-${id}{border-left:2px solid ${color};position:absolute;height:100%;box-sizing:border-box}.yRemoteSelectionHead-${id}::after{content:'';position:absolute;top:-2px;left:-3px;width:5px;height:5px;background:${color}}`,
            )
            .join('\n');
    };

    awareness.on('change', renderPresence);
    renderPresence();

    return () => {
        awareness.off('change', renderPresence);
        style.remove();
    };
}
