export class TokenStatsInfo {
    private readonly _supply: number;
    private readonly _burned: number;
    private readonly _sdogeLpAdded: number;
    private readonly _bnbLpAdded: number;
    private readonly _collected: number;

    constructor(supply: number, burned: number, sdogeLpAdded: number,  bnbLpAdded: number, collected: number) {
        this._supply = supply;
        this._burned = burned;
        this._bnbLpAdded = bnbLpAdded;
        this._sdogeLpAdded = sdogeLpAdded;
        this._collected = collected;
    }

    get supply(): number {
        return this._supply;
    }

    get burned(): number {
        return this._burned;
    }

    get sdogeLpAdded(): number {
        return this._sdogeLpAdded;
    }

    get bnbLpAdded(): number {
        return this._bnbLpAdded;
    }

    get collected(): number {
        return this._collected;
    }
}
