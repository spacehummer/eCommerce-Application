interface Route {
  path: string;
  callback: () => void;
}

export type Routes = Route[];

export default class Router {
  private routes: Routes;

  constructor(routes: Routes) {
    this.routes = routes;
  }

  /**
   * Method for navigate throw App, using URL in string format.
   * @param {string}  urlStr
   */
  public navigate(urlStr: string): void {
    console.log(`Rote to page URL: ${urlStr}`);
  }
}
