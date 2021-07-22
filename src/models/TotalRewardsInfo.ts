export class TotalRewardsInfo {
    private readonly _holders: number;
    private readonly _total: number;

    constructor(holders: number, total: number) {
        this._holders = holders;
        this._total = total;
    }

    get holders(): number {
        return this._holders;
    }

    get total(): number {
        return this._total;
    }
}
