export class TokenFeaturesInfo {
    private readonly _rewardFees: number;
    private readonly _lpFees: number;
    private readonly _treasuryFees: number;
    private readonly _burnFees: number;
    private readonly _rewardToken: string;
    private readonly _swapSlippage: number;
    private readonly _rewardSlippage: number;
    private readonly _safeLaunchOn: boolean;

    constructor(rewardFees: number, lpFees: number, treasuryFees: number, burnFees: number,
                rewardToken: string, swapSlippage: number, rewardSlippage: number, safeLaunchOn: boolean) {
        this._rewardFees = rewardFees;
        this._lpFees = lpFees;
        this._treasuryFees = treasuryFees;
        this._burnFees = burnFees;
        this._rewardToken = rewardToken;
        this._swapSlippage = swapSlippage;
        this._rewardSlippage = rewardSlippage;
        this._safeLaunchOn = safeLaunchOn;
    }

    get rewardFees(): number {
        return this._rewardFees;
    }

    get lpFees(): number {
        return this._lpFees;
    }

    get treasuryFees(): number {
        return this._treasuryFees;
    }

    get burnFees(): number {
        return this._burnFees;
    }

    get rewardToken(): string {
        return this._rewardToken;
    }

    get rewardSlippage(): number {
        return this._rewardSlippage;
    }

    get swapSlippage(): number {
        return this._swapSlippage;
    }

    get safeLaunchOn(): boolean {
        return this._safeLaunchOn;
    }
}
