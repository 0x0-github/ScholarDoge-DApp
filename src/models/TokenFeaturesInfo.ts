export class TokenFeaturesInfo {
    private readonly _rewardFees: number;
    private readonly _rewardsOn: boolean;
    private readonly _lpFees: number;
    private readonly _lpOn: number;
    private readonly _treasuryFees: number;
    private readonly _burnFees: number;
    private readonly _burnOn: number;

    constructor(rewardFees: number, rewardsOn: boolean, lpFees: number, lpOn: number, treasuryFees: number, burnFees: number, burnOn: number) {
        this._rewardFees = rewardFees;
        this._rewardsOn = rewardsOn;
        this._lpFees = lpFees;
        this._lpOn = lpOn;
        this._treasuryFees = treasuryFees;
        this._burnFees = burnFees;
        this._burnOn = burnOn;
    }

    get rewardFees(): number {
        return this._rewardFees;
    }

    get rewardsOn(): boolean {
        return this._rewardsOn;
    }

    get lpFees(): number {
        return this._lpFees;
    }

    get lpOn(): number {
        return this._lpOn;
    }

    get treasuryFees(): number {
        return this._treasuryFees;
    }

    get burnFees(): number {
        return this._burnFees;
    }

    get burnOn(): number {
        return this._burnOn;
    }
}
