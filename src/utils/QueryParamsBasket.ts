class QueryParamsBasket {
  private param: URLSearchParams;

  constructor() {
    this.param = new URLSearchParams(window.location.search);
  }

  public getAllParams(): string {
    return this.param.toString();
  }

  public setParam(key: string, value: string): void {
    this.param.set(key, value);
  }

  public getParam(key: string): string | null {
    return this.param.get(key);
  }

  public sendParams(cb: () => void): void {
    const url = new URL(window.location.href);
    Array.from(this.param.entries()).forEach(([key, value]) => url.searchParams.set(key, value));
    window.history.pushState(null, '', url.href);
    cb();
  }
}

export default QueryParamsBasket;
