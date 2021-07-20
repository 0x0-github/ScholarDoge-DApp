export const numberToDecimalStr = (nb: number) => {
    try {
        return nb.toFixed(18);
    } catch (_) {
        return "0";
    }
}
