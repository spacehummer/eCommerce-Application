import { BasicComponent, BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import cartState from '#src/logic/state/cartState';
import View, { ViewLogicParams } from '#src/view/view';
import NavItemLinkView from '#src/view/header/navigation/nav-item-link-view';
import CartEvent from '#src/logic/state/cartStateEvent';
import BaseItemLinkView from '#src/view/header/navigation/base-nav-item-link-view';
import { ProductPrice } from '../catalog/components/types';
import BasketProductsView from './basket-products-view';
import PriceView from '../catalog/components/price-view';
import EditButton from '../profile/components/edit-btn';
import BasketModel from './basket-model';
import '#assets/styles/basket-cart.css';
import AddPromoCodeForm, { PromoCodeFields } from './components/add-promo-code-form';

const args: BasicComponentConstructorArgs = {
  tagName: TagsEnum.SECTION,
  classNames: ClassesEnum.BASKET,
};

const basketModel = new BasketModel();

export default class BasketView extends View {
  private totalPrice?: PriceView;

  private addPromoCodeForm?: AddPromoCodeForm;

  private basketProductsView?: BasketProductsView;

  constructor(logicParams: ViewLogicParams) {
    super(args, logicParams);

    this.createComponents();

    cartState.addStateListener('update', this.onCartChange.bind(this));
  }

  private onCartChange(event: CartEvent): void {
    const { cart } = event;
    if (cart) {
      if (cart.lineItems.length > 0) {
        if (this.basketProductsView) {
          const newTotal = this.basketProductsView.updateCartPrices(cart);
          this.totalPrice?.setPrice(newTotal);
        }
      } else {
        this.clearBasket();
      }
    }
  }

  private createTitle(): void {
    const title = document.createElement(TagsEnum.H2);
    title.textContent = 'Basket';

    this.basicComponent.addInnerElement(title);
  }

  private createComponents(): void {
    const cart = cartState.getCart();
    this.createTitle();
    if (cart && cart.lineItems.length > 0) {
      const productsInCart = new BasketProductsView();
      productsInCart.setBasketProducts(cart.lineItems);
      const newTotal = productsInCart.updateCartPrices(cart);
      this.basicComponent.addInnerElement(productsInCart);
      this.basketProductsView = productsInCart;

      this.createTotal(newTotal);

      this.createDiscountCodeForm();

      this.createClearCartBtn();
    } else {
      // empty cart
      this.showEmptyCart();
    }
  }

  private createClearCartBtn(): void {
    const btn = new EditButton(() => this.onClearBasket(), 'Clear basket items.');
    this.basicComponent.addInnerElement(btn);
  }

  private clearBasket(): void {
    this.basicComponent.htmlElement?.replaceChildren('');
    this.createTitle();
    this.showEmptyCart();
  }

  private onClearBasket(): void {
    const isConfirm = window.confirm('Are you want to clear cart?');
    if (isConfirm) {
      this.clearBasket();
      basketModel.clearCart();
    }
  }

  private createDiscountCodeForm(): void {
    const container = new BasicComponent({
      tagName: TagsEnum.CONTAINER,
      classNames: ClassesEnum.ONLY_FOR_DRAFT_CODE,
    });
    const addedContainer = new BasicComponent({
      tagName: TagsEnum.CONTAINER,
      classNames: ClassesEnum.ONLY_FOR_DRAFT_CODE,
    });

    const callback = (record: Record<string, string | Record<string, string>>): void => {
      const cart = cartState.getCart();
      if (cart) {
        const code = record[PromoCodeFields.PromoCode] as string;
        basketModel.applyDiscountCode({ code, id: cart.id, version: cart.version }).then((res) => {
          this.addPromoCodeForm?.showSubmitResults('Promo-code Activated!', res);
          if (res.isSuccessful) {
            const activePromoCode = new BasicComponent({
              tagName: TagsEnum.PARAGRAPH,
              classNames: ClassesEnum.ONLY_FOR_DRAFT_CODE,
            });
            activePromoCode.setTextContent(code);
            addedContainer.addInnerElement(activePromoCode);
          }
        });
      }
    };
    this.addPromoCodeForm = new AddPromoCodeForm(callback);

    container.addInnerElement(addedContainer);
    container.addInnerElement(this.addPromoCodeForm);
    this.basicComponent.addInnerElement(container);
  }

  private showEmptyCart(): void {
    const component = new BasicComponent({
      tagName: TagsEnum.H4,
      classNames: ClassesEnum.ONLY_FOR_DRAFT_CODE,
    });
    component.setTextContent('Your basket is empty.');

    this.basicComponent.addInnerElement(component);

    const link = new BaseItemLinkView(
      ClassesEnum.BASKET_LINK,
      ClassesEnum.ITEM_CURRENT,
      {
        callback: (): void => {
          this.logicParams?.router.navigate('catalog');
        },
        name: 'Go to "Catalog" page and add books you want!',
      },
      new Map<string, NavItemLinkView>()
    );

    this.basicComponent.addInnerElement(link);
  }

  private createTotal(price: ProductPrice): void {
    this.totalPrice = new PriceView(price, 'Total price');
    this.basicComponent.addInnerElement(this.totalPrice);
  }
}
