export function getChartColor(variable: string, fallback: string) {
    if (typeof document === 'undefined') {
        return fallback;
    }

    const value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();

    return value || fallback;
}
