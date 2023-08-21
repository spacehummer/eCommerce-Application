import LoginView from '#src/view/login/login-view';
import MainView from '#src/view/main/main-view';
import NotFoundView from '#src/view/not-found/not-found-view';

const routes: Record<string | number, new () => object> = {
  404: NotFoundView,
  '/': MainView,
  '/#login': LoginView,
};

let onRouteCallback: () => void;

export const handleRoute = async (): Promise<new () => object> => {
  const path = window.location.pathname + window.location.hash;
  return routes[path] || routes[404];
};

export const route = (e?: Event): void => {
  const event = e || window.event;
  event?.preventDefault();
  const target = event?.target as HTMLLinkElement;
  window.history.pushState({}, '', target.href);
  onRouteCallback();
};

export const startRouting = (argOnRouteCallback: () => void): void => {
  onRouteCallback = argOnRouteCallback;
  window.onpopstate = onRouteCallback;
  window.history.pushState({}, '', '#');
  onRouteCallback();
};
