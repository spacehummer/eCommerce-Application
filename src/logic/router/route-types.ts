export interface Route {
  path: string;
  callback: () => void;
}

export type Routes = Route[];
