import { ID_SELECTOR, PagesUrls } from '#src/logic/router/pages-params';

interface Route {
  path: string;
  callback: () => void;
}

export type Routes = Route[];

interface UserRequest {
  path: string;
  resource: string;
}

export default class Router {
  private readonly routes: Routes;

  constructor(routes: Routes) {
    this.routes = routes;

    document.addEventListener('DOMContentLoaded', () => {
      const startAddressBarPath = this.getCurrentAddressBarPath();
      this.navigate(startAddressBarPath);
      console.log(`Startup navigation! Navigate to: ${startAddressBarPath}`);
    });

    // work with agent URL address bar.
    window.addEventListener('popstate', this.browserAddressBarHandler.bind(this));
    window.addEventListener('hashchange', this.browserAddressBarHandler.bind(this));
  }

  /**
   * Method for navigate throw App, using URL in string format.
   * seekingPath - path for navigation. Depends on whether the `.resource` is empty or not.
   * @param {string}  urlStr
   */
  public navigate(urlStr: string): void {
    console.log(`Rote to page URL: ${urlStr}`);
    console.log('Current routes:', this.routes);

    const requestFromURL = this.parseURLStr(urlStr);

    const seekingPath =
      requestFromURL.resource === ''
        ? requestFromURL.path
        : `${requestFromURL.path}/${ID_SELECTOR}`;

    const route = this.routes.find((currentRoute) => currentRoute.path === seekingPath);

    if (!route) {
      this.redirectToError404();
      return undefined;
    }

    route.callback();
    return undefined;
  }

  /**
   * Parse user request from URL.
   * @return { UserRequest }  - parsed user request.
   * @private
   */
  private parseURLStr(URLStr: string): UserRequest {
    const result: UserRequest = {
      path: '',
      resource: '',
    };

    [result.path = '', result.resource = ''] = URLStr.split('/');

    return result;
  }

  private redirectToError404(): void {
    const routeError404 = this.routes.find(
      (currentRoute) => currentRoute.path === PagesUrls.ERROR_404
    );
    if (routeError404) {
      this.navigate(routeError404.path);
    }
  }

  private browserAddressBarHandler(): void {
    const addressBarPath = this.getCurrentAddressBarPath();
    console.log(addressBarPath);
    this.navigate(addressBarPath);
  }

  private getCurrentAddressBarPath(): string {
    if (window.location.hash) {
      return window.location.hash.slice(1);
    }
    return window.location.pathname.slice(1);
  }
}