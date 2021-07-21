export const numberToDecimalStr = (nb: number, decimals= 18) => {
    try {
        return nb.toFixed(decimals);
    } catch (_) {
        return "0";
    }
}
