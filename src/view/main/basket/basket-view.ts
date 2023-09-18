import { CentPrecisionMoney, LineItem } from '@commercetools/platform-sdk';
import { BasicComponent, BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import cartState from '#src/logic/state/cartState';
import View, { ViewLogicParams } from '#src/view/view';
import NavItemLinkView from '#src/view/header/navigation/nav-item-link-view';
import CartEvent from '#src/logic/state/cartStateEvent';
import { BasketProduct } from '../catalog/components/types';
import BasketProductsView from './basket-products-view';
import PriceView from '../catalog/components/price-view';

const args: BasicComponentConstructorArgs = {
  tagName: TagsEnum.SECTION,
  classNames: ClassesEnum.ONLY_FOR_DRAFT_CODE,
};

export default class BasketView extends View {
  private totalPrice?: PriceView;

  constructor(logicParams: ViewLogicParams) {
    super(args, logicParams);

    const title = document.createElement(TagsEnum.H2);
    title.textContent = 'Basket';

    this.basicComponent.addInnerElement(title);

    this.createComponents();

    cartState.addStateListener('update', this.onCartChange.bind(this));
  }

  private onCartChange(event: CartEvent): void {
    const { cart } = event;
    if (cart) {
      this.totalPrice?.setPrice({ value: cart.totalPrice });
    }
  }

  private createComponents(): void {
    const cart = cartState.getCart();
    if (cart) {
      const productsInCart = new BasketProductsView();
      const items = cart.lineItems.map(
        (item: LineItem): BasketProduct => {
          return {
            product: {
              id: item.productId,
              masterVariant: item.variant,
              name: item.name,
              slug: item.productSlug,
            },
            id: item.id,
            quantity: item.quantity,
            totalPrice: { value: item.totalPrice },
          };
        }
      );
      productsInCart.setBasketProducts(items);
      this.basicComponent.addInnerElement(productsInCart);

      this.createTotal(cart.totalPrice);
    } else {
      // empty cart
      const component = new BasicComponent({
        tagName: TagsEnum.CONTAINER,
        classNames: ClassesEnum.ONLY_FOR_DRAFT_CODE,
      });
      component.setTextContent('Your basket is empty.');

      this.basicComponent.addInnerElement(component);

      const link = new NavItemLinkView(
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
  }

  private createTotal(price: CentPrecisionMoney): void {
    this.totalPrice = new PriceView({ value: price }, 'Total price');
    this.basicComponent.addInnerElement(this.totalPrice);
  }
}
