export interface Route {
  path: string;
  callback: () => void;
}

export type Routes = Route[];

export interface Router {
  navigate(urlStr: string): void;
}
