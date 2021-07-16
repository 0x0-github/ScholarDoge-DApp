export class DividendHistory {
    private readonly _address: string;
    private readonly _date: number;
    private readonly _amountBNB: number;

    constructor(address: string, date: number, amountBNB: number) {
        this._address = address;
        this._date = date;
        this._amountBNB = amountBNB;
    }

    get address(): string {
        return this._address;
    }

    get date(): number {
        return this._date;
    }

    get amountBNB(): number {
        return this._amountBNB;
    }
}
