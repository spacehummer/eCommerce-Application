const enum ClassesEnum {
  /* General styles */
  ROOT_CONTAINER = 'root-container',
  CONTENT = 'content',
  SECTION = 'section',
  HEADER = 'header',
  CONTENT_HEADER = 'content--header',
  MAIN = 'main',
  CONTENT_MAIN = 'content--main',
  FOOTER = 'footer',
  PLACEHOLDER = 'placeholder',
  /* Logo */
  GENERAL_LOGO = 'logo',
  GENERAL_LOGO_IMG = 'logo__img',
  GENERAL_LOGO_NAME = 'logo__name',
  /* Nav menu */
  NAV_MENU = 'nav-menu',
  NAV_MENU_LIST = 'nav-menu-list reset-list',
  NAV_MENU_LIST_ITEM = 'nav-menu-list__item reset-list-element',
  NAV_MENU_LIST_ITEM_LINK = 'nav-link reset-link cursor-pointer',
  ITEM = 'item__link',
  ITEM_CURRENT = 'item__link--current',
  /* Main page */
  /* Login / Register */
  LOGIN = 'login',
  LOGIN_FORM = 'login-form',
  FORM_FIELD = 'form-field',
  FORM_FIELD_CHECKBOX = 'form-field-checkbox',
  INPUT = 'form__input',
  INPUT_CHECK = 'form__input-check',
  INPUT_LABEL = 'form__label',
  INPUT_LIST = 'form__input-list',
  INPUT_SUBMIT = 'from__submit-btn',
  INPUT_INVALID = 'form__input__invalid',
  FORM_ERROR_MESSAGE = 'form__error-msg',
  FORM_OK_MESSAGE = 'form__ok-msg',
  SIGN_UP = 'sign-up',
  SIGN_UP_FORM = 'sign-up-form',
}

export default ClassesEnum;
