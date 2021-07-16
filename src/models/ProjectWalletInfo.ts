import {UserDividendsInfo} from "./UserDividendsInfo";

export class ProjectWalletInfo {
    private readonly _holding$SDOGE: number;
    private readonly _holdingBNB: number;
    private readonly _dividendsInfo: UserDividendsInfo;

    constructor(holding$SDOGE: number, holdingBNB: number, dividendsInfo: UserDividendsInfo) {
        this._holding$SDOGE = holding$SDOGE;
        this._holdingBNB = holdingBNB;
        this._dividendsInfo = dividendsInfo;
    }

    get holding$SDOGE(): number {
        return this._holding$SDOGE;
    }

    get holdingBNB(): number {
        return this._holdingBNB;
    }

    get dividendsInfo(): UserDividendsInfo {
        return this._dividendsInfo;
    }
}
