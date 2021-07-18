
export const timestampToFormattedDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);

    return date.toISOString().slice(-13, -5);
}
