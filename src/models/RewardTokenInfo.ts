export class RewardTokenInfo {
    private readonly _address: string;
    private readonly _name: string;
    private readonly _symbol: string;
    private readonly _decimals: number;

    constructor(address?: string, name?: string, symbol?: string, decimals?: number) {
        this._address = address != null ? address : '';
        this._name = name != null ? name : '';
        this._symbol = symbol != null ? symbol : '';
        this._decimals = decimals != null ? decimals : 0;
    }

    get address(): string {
        return this._address;
    }

    get name(): string {
        return this._name;
    }

    get symbol(): string {
        return this._symbol;
    }

    get decimals(): number {
        return this._decimals;
    }
}
