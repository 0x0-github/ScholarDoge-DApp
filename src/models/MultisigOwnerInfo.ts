export class MultisigOwnerInfo {
    private readonly _index: number;
    private readonly _address: string;

    constructor(index: number, address: string) {
        this._index = index;
        this._address = address;
    }

    get index(): number {
        return this._index;
    }

    get address(): string {
        return this._address;
    }
}
