export class TokenConstraintsInfo {
    private readonly _maxHold: number;
    private readonly _maxSellTx: number;
    private readonly _claimTime: number;

    constructor(maxHold: number, maxSellTx: number, claimTime: number) {
        this._maxHold = maxHold;
        this._maxSellTx = maxSellTx;
        this._claimTime = claimTime;
    }

    get maxHold(): number {
        return this._maxHold;
    }

    get maxSellTx(): number {
        return this._maxSellTx;
    }

    get claimTime(): number {
        return this._claimTime;
    }
}
