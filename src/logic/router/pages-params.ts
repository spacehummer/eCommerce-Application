/**
 * Names of pages available via navigation menu.
 */
const PagesNames: { [index: string]: string } = {
  INDEX: 'Main',
  LOGIN: 'Log in',
  SIGN_UP: 'Sign up',
};

const pagesSequence: string[] = ['INDEX', 'SIGN_UP', 'LOGIN'];

const PagesUrls: { [index: string]: string } = {
  INDEX: 'main',
  LOGIN: 'login',
  SIGN_UP: 'sign-up',
  ERROR_404: 'error-404',
};

const ID_SELECTOR = '{id}';

export { PagesNames, pagesSequence, PagesUrls, ID_SELECTOR };
