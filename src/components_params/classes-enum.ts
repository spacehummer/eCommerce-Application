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
  /* ONLY FOR DRAFT CODE */
  ONLY_FOR_DRAFT_CODE = 'only_for_draft_code',
  /* BASKET */
  BASKET = 'basket',
  BASKET_CART_LIST = 'basket-cart-list',
  BASKET_LINK = 'basket-link',
  /* BASKET CART */
  BASKET_CART = 'basket-cart',
  BASKET_CART__IMAGE = 'basket-cart__image',
  BASKET_CART__CONTENT = 'basket-cart__content',
  BASKET_CART__CTRL = 'basket-cart__ctrl',
  BASKET_CART__INPUT = 'basket-cart__input',
  /* CART */
  CART = 'cart',
  CART_TITLE = 'cart-title',
  CART_DESCRIPTION = 'cart-desc',
  CART__IMAGE = 'cart__image',
  CART__ADD_TO_BASKET = 'cart__add-to-basket',
  /* CART_PRICE */
  CART_PRICE__CONTAINER = 'cart-price__container',
  CART_PRICE__FIELD = 'cart-price__field',
  CART_PRICE__VALUE = 'cart-price__value',
  CART_PRICE__VALUE__DISCOUNT = 'cart-price__value__discount',
  /* ERROR 404 */
  SECTION_404 = 'page-section page-section--error-404',
  SECTION_404_HEADING = 'page-section__heading page-section__heading--error-404',
  SECTION_404_TEXT_BLOCK = 'page-section__text-block page-section__text-block--error-404',
  SECTION_404_PARAGRAPH = 'text-block__paragraph text-block__paragraph--error-404',
}

export default ClassesEnum;
