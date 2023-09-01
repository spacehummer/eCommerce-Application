/**
 * Names of pages available via navigation menu.
 */
const PagesNames: { [index: string]: string } = {
  INDEX: 'Main',
  LOGIN: 'Log in',
  SIGN_UP: 'Sign up',
  PROFILE: 'Profile',
};

const pagesSequence: string[] = ['INDEX', 'SIGN_UP', 'LOGIN', 'PROFILE'];

const PagesUrls: { [index: string]: string } = {
  INDEX: 'main',
  LOGIN: 'login',
  SIGN_UP: 'sign-up',
  PROFILE: 'profile',
  ERROR_404: 'error-404',
};

/**
 * Only for anonymous users visible pages indexes in @pagesSequence
 */
const anonPageIndexes = [1, 2];
/**
 * Only for authorized users visible pages indexes in @pagesSequence
 */
const signPageIndexes = [3];

const ID_SELECTOR = '{id}';

export { PagesNames, pagesSequence, PagesUrls, ID_SELECTOR, anonPageIndexes, signPageIndexes };
