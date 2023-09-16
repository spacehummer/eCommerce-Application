/**
 * Names of pages available via navigation menu.
 */
const PagesNames: { [index: string]: string } = {
  INDEX: 'Main',
  CATALOG: 'Catalog',
  LOGIN: 'Log in',
  SIGN_UP: 'Sign up',
  PROFILE: 'Profile',
};

export enum PageEnum {
  INDEX = 'INDEX',
  CATALOG = 'CATALOG',
}

export enum AnonPageEnum {
  SIGN_UP = 'SIGN_UP',
  LOGIN = 'LOGIN',
}

export enum SignPageEnum {
  PROFILE = 'PROFILE',
}

export const AllPages = { ...PageEnum, ...AnonPageEnum, ...SignPageEnum };
export type AllPageEnum = typeof AllPages;

const pagesSequence: string[] = [...Object.values(AllPages)];

export const SignAvailablePage = { ...PageEnum, ...SignPageEnum };
export type SignAvailablePageEnum = typeof SignAvailablePage;

export const AnonAvailablePage = { ...PageEnum, ...AnonPageEnum };
export type AnonAvailablePageEnum = typeof SignAvailablePage;

// how to use:
// let a: AllPageEnum = AllPages.PROFILE

const PagesUrls: { [index: string]: string } = {
  INDEX: 'main',
  CATALOG: 'catalog',
  LOGIN: 'login',
  SIGN_UP: 'sign-up',
  PROFILE: 'profile',
  ERROR_404: 'error-404',
};

const ID_SELECTOR = '{id}';

export { PagesNames, pagesSequence, PagesUrls, ID_SELECTOR };
