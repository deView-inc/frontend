export const RADAR_SIZE = 220;
export const RADAR_CENTER = RADAR_SIZE / 2;
export const RADAR_RADIUS = 80;

interface Point {
    x: number;
    y: number;
}

export function pointOnAxis(index: number, total: number, value: number): Point {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const r = (RADAR_RADIUS * value) / 100;
    return {
        x: RADAR_CENTER + r * Math.cos(angle),
        y: RADAR_CENTER + r * Math.sin(angle),
    };
}

export function labelPoint(index: number, total: number): Point {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const r = RADAR_RADIUS + 24;
    return {
        x: RADAR_CENTER + r * Math.cos(angle),
        y: RADAR_CENTER + r * Math.sin(angle),
    };
}
