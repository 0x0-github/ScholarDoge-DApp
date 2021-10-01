export class TokenDependenciesInfo {
    private readonly _dividendTracker: string;
    private readonly _router: string;
    private readonly _pair: string;

    constructor(dividendTracker: string, router: string, pair: string) {
        this._dividendTracker = dividendTracker;
        this._router = router;
        this._pair = pair;
    }

    get dividendTracker(): string {
        return this._dividendTracker;
    }

    get router(): string {
        return this._router;
    }

    get pair(): string {
        return this._pair;
    }
}
