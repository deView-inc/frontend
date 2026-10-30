export function fitTiles(
    count: number,
    width: number,
    height: number,
    gap: number,
    ratio = 1,
    maxWidth = Infinity,
) {
    let best = { w: 0, h: 0 };
    if (!count || width <= 0 || height <= 0) {
        return best;
    }

    for (let cols = 1; cols <= count; cols++) {
        const rows = Math.ceil(count / cols);
        const cellW = (width - gap * (cols - 1)) / cols;
        const cellH = (height - gap * (rows - 1)) / rows;
        if (cellW <= 0 || cellH <= 0) {
            continue;
        }

        const w = Math.min(cellW, cellH * ratio, maxWidth);
        if (w > best.w) {
            best = { w: Math.floor(w), h: Math.floor(w / ratio) };
        }
    }
    return best;
}
