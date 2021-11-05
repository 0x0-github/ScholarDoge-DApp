export class MultisigTransactionInfo {
    private readonly _index: number;
    private readonly _to: string;
    private readonly _value: string;
    private readonly _type: string;
    private readonly _confirmations: number;
    private readonly _executed: boolean;

    constructor(index: number, to: string, value: string, type: string, confirmations: number, executed: boolean) {
        this._index = index;
        this._to = to;
        this._value = value;
        this._type = type;
        this._confirmations = confirmations;
        this._executed = executed;
    }

    get index(): number {
        return this._index;
    }

    get to(): string {
        return this._to;
    }

    get value(): string {
        return this._value;
    }

    get type(): string {
        return this._type;
    }

    get confirmations(): number {
        return this._confirmations;
    }

    get executed(): boolean {
        return this._executed;
    }
}
