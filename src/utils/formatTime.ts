export const timestampToFormattedDate = (timestamp: number) => {
    try {
        const date = new Date(timestamp * 1000);

        return date.toISOString().slice(-13, -5);
    } catch (_) {
        return '-';
    }
}
