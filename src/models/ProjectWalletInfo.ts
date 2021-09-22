import {UserDividendsInfo} from "./UserDividendsInfo";

export class ProjectWalletInfo {
    private readonly _holdingSDOGE: number;
    private readonly _holdingRewards: number;
    private readonly _dividendsInfo: UserDividendsInfo;

    constructor(holdingSDOGE: number, holdingRewards: number, dividendsInfo: UserDividendsInfo) {
        this._holdingSDOGE = holdingSDOGE;
        this._holdingRewards = holdingRewards;
        this._dividendsInfo = dividendsInfo;
    }

    get holdingSDOGE(): number {
        return this._holdingSDOGE;
    }

    get holdingRewards(): number {
        return this._holdingRewards;
    }

    get dividendsInfo(): UserDividendsInfo {
        return this._dividendsInfo;
    }
}
