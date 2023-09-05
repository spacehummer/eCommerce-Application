import { isAuthorised } from '../state/state';
import {
    PagesUrls,
    AnonPageEnum,
    SignAvailablePage,
    PageEnum,
    AnonAvailablePage,
} from './pages-params';
import { Route, Routes } from './route-types';

const isAvailableRoute = (seeking: string, availableList: Record<string, string>): number => {
    return Object.values(availableList).findIndex((val) => PagesUrls[val] === seeking);
};

const findRoute = (routes: Routes, seekingPath: string): Route | undefined =>
    routes.find((currentRoute) => currentRoute.path === seekingPath);

const getFiltred = (
    routes: Routes,
    seekingPath: string,
    availableList: Record<string, string>,
    redirectPath: string
): Route | undefined => {
    if (isAvailableRoute(seekingPath, availableList) !== -1) {
        return findRoute(routes, seekingPath);
    }
    return findRoute(routes, PagesUrls[redirectPath]);
};

export const filter = (routes: Routes, seekingPath: string): Route | undefined => {
    if (isAuthorised()) {
        return getFiltred(routes, seekingPath, SignAvailablePage, PageEnum.INDEX);
    }
    return getFiltred(routes, seekingPath, AnonAvailablePage, AnonPageEnum.LOGIN);
};

export const isAvailablePage = (page: string): boolean => {
    const availableList = isAuthorised() ? SignAvailablePage : AnonAvailablePage;
    return Object.values(availableList).findIndex((val) => val === page) > -1;
};
