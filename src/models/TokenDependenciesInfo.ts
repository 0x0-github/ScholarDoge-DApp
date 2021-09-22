export class TokenDependenciesInfo {
    private readonly _router: string;
    private readonly _pair: string;

    constructor(router: string, pair: string) {
        this._router = router;
        this._pair = pair;
    }

    get router(): string {
        return this._router;
    }

    get pair(): string {
        return this._pair;
    }
}
