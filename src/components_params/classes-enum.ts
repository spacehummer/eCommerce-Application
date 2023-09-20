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
  CONTENT_FOOTER = 'content--footer',
  HEADING_H1 = 'heading-h1',
  HEADING_H2 = 'heading-h2',
  HEADING_H3 = 'heading-h3',
  PARAGRAPH = 'paragraph',
  FONT_HEADING_TYPE_1 = 'heading-type-1',
  FONT_HEADING_TYPE_2 = 'heading-type-2',
  FONT_HEADING_TYPE_3 = 'heading-type-3',
  FONT_PARAGRAPH_1 = 'paragraph-type-1',
  FONT_PARAGRAPH_2 = 'paragraph-type-2',
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
  MAIN_WELCOME_SECTION = 'page-section page-section--welcome',
  MAIN_WELCOME_SECTION_HEADING = 'page-section__heading page-section__heading--welcome',
  MAIN_WELCOME_SECTION_TEXT_BLOCK = 'page-section__text-block page-section__text-block--welcome',
  MAIN_WELCOME_SECTION_PARAGRAPH = 'text-block__paragraph text-block__paragraph--welcome',
  /* GitHub link */
  GITHUB_LINK = 'github-link',
  GITHUB_LINK_LOGO = 'github-link__gh-logo',
  GITHUB_LINK_TEXT = 'github-link__text',
  /* Login / Register */
  LOGIN = 'login',
  LOGIN_FORM = 'login-form',
  FORM_FIELD = 'form-field',
  FORM_FIELD_CONTAINER = 'form-field-container',
  FORM_FIELD_CHECKBOX = 'form-field-checkbox',
  INPUT = 'form__input',
  INPUT_CHECK = 'form__input-check',
  INPUT_LABEL = 'form__label',
  INPUT_LIST = 'form__input-list',
  INPUT_SUBMIT = 'from__submit-btn',
  INPUT_SELECT = 'form__input-select',
  INPUT_INVALID = 'form__input__invalid',
  FORM_MESSAGE = 'form__msg',
  FORM_ERROR_MESSAGE = 'form__error-msg',
  FORM_OK_MESSAGE = 'form__ok-msg',
  SIGN_UP = 'sign-up',
  SIGN_UP_FORM = 'sign-up-form',
  /* TO NOT DISPLAY */
  HIDDEN = 'hidden',
  /* Modal window */
  MODAL_WINDOW_SHADING = 'viewport-shading',
  MODAL_WINDOW_CONTAINER_WRP = 'modal-window__container-wrp',
  MODAL_WINDOW_CONTAINER = 'modal-window__container',
  MODAL_WINDOW_CONTAINER_OK = 'modal-window__container--ok',
  MODAL_WINDOW_CONTAINER_ERR = 'modal-window__container--err',
  MODAL_WINDOW_HEADING_CONTAINER = 'modal-window__heading-container',
  MODAL_WINDOW_STATE_ICON_WRP = 'modal-window__state-icon-wrp',
  MODAL_WINDOW_STATE_ICON = 'modal-window__state-icon',
  MODAL_WINDOW_HEADING_LABEL = 'modal-window__heading-text-label heading_type-3',
  MODAL_WINDOW_BTN_CLOSE_BASE = 'modal-window__btn-close cursor-pointer',
  MODAL_WINDOW_BTN_CLOSE_OK = 'modal-window__btn-close--ok',
  MODAL_WINDOW_BTN_CLOSE_ERR = 'modal-window__btn-close--err',
  MODAL_WINDOW_CONTENT_CONTAINER = 'modal-window__content-container',
  MODAL_WINDOW_CONTENT_PARAGRAPH = 'modal-window__content-paragraph paragraph_type_2',
  /* ERROR 404 */
  SECTION_404 = 'page-section page-section--error-404',
  SECTION_404_HEADING = 'page-section__heading page-section__heading--error-404',
  SECTION_404_TEXT_BLOCK = 'page-section__text-block page-section__text-block--error-404',
  SECTION_404_PARAGRAPH = 'text-block__paragraph text-block__paragraph--error-404',
  /* About us */
  ABOUT_US_SECTION = 'page-section page-section--about-us',
  ABOUT_US_SECTION_HEADING = 'about-us__heading',
  ABOUT_US_SECTION_CONTRIBUTORS_SECTION = 'about-us__contributor-section',
  ABOUT_US_SECTION_CONTRIBUTORS_SECTION_PHOTO_WRP = 'about-us__contributor-photo-wrp',
  ABOUT_US_SECTION_CONTRIBUTORS_SECTION_PHOTO = 'about-us__contributor-photo',
  ABOUT_US_SECTION_CONTRIBUTORS_SECTION_RIGHT_SIDE = 'about-us__contributor-section-right-side',
  ABOUT_US_SECTION_CONTRIBUTORS_SUBSECTION = 'about-us__contributor-subsection',
  ABOUT_US_SECTION_CONTRIBUTORS_LIST = 'about-us__subsection-list',
  ABOUT_US_SECTION_CONTRIBUTORS_LIST_ELEMENT = 'about-us__subsection-list-element',
  /* ONLY FOR DRAFT CODE */
  ONLY_FOR_DRAFT_CODE = '',
  /* Modifiers */
  SPARSE_004 = 'sparse-004',
  FONT_WEIGHT_500 = 'fw-500',
}

export default ClassesEnum;
