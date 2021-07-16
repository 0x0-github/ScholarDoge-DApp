export class UserDividendsInfo {
    private readonly _account: string;
    private readonly _iterationsUntilProcessed: number;
    private readonly _withdrawableDividends: number;
    private readonly _totalDividends: number;
    private readonly _lastClaimTime: number;
    private readonly _nextClaimTime: number;
    private readonly _secondsUntilAutoClaimAvailable: number;

    constructor(account: string, iterationsUntilProcessed: number, withdrawableDividends: number,
                totalDividends: number, lastClaimTime: number, nextClaimTime: number,
                secondsUntilAutoClaimAvailable: number) {
        this._account = account;
        this._iterationsUntilProcessed = iterationsUntilProcessed;
        this._withdrawableDividends = withdrawableDividends;
        this._totalDividends = totalDividends;
        this._lastClaimTime = lastClaimTime;
        this._nextClaimTime = nextClaimTime;
        this._secondsUntilAutoClaimAvailable = secondsUntilAutoClaimAvailable;
    }

    get account(): string {
        return this._account;
    }

    get iterationsUntilProcessed(): number {
        return this._iterationsUntilProcessed;
    }

    get withdrawableDividends(): number {
        return this._withdrawableDividends;
    }

    get totalDividends(): number {
        return this._totalDividends;
    }

    get lastClaimTime(): number {
        return this._lastClaimTime;
    }

    get nextClaimTime(): number {
        return this._nextClaimTime;
    }

    get secondsUntilAutoClaimAvailable(): number {
        return this._secondsUntilAutoClaimAvailable;
    }
}
