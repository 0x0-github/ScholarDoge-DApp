import {UserDividendsInfo} from "./UserDividendsInfo";

export class ProjectWalletInfo {
    private readonly _holdingSDOGE: number;
    private readonly _holdingBNB: number;
    private readonly _dividendsInfo: UserDividendsInfo;

    constructor(holdingSDOGE: number, holdingBNB: number, dividendsInfo: UserDividendsInfo) {
        this._holdingSDOGE = holdingSDOGE;
        this._holdingBNB = holdingBNB;
        this._dividendsInfo = dividendsInfo;
    }

    get holdingSDOGE(): number {
        return this._holdingSDOGE;
    }

    get holdingBNB(): number {
        return this._holdingBNB;
    }

    get dividendsInfo(): UserDividendsInfo {
        return this._dividendsInfo;
    }
}
