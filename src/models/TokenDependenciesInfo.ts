export class TokenDependenciesInfo {
    private readonly _router: string;
    private readonly _pair: string;
    private readonly _dividendTracker: string;

    constructor(router: string, pair: string, dividendTracker: string) {
        this._router = router;
        this._pair = pair;
        this._dividendTracker = dividendTracker;
    }

    get router(): string {
        return this._router;
    }

    get pair(): string {
        return this._pair;
    }

    get dividendTracker(): string {
        return this._dividendTracker;
    }
}
