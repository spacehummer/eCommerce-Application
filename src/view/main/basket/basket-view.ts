import { CentPrecisionMoney, LineItem } from '@commercetools/platform-sdk';
import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import cartState from '#src/logic/state/cartState';
import View, { ViewLogicParams } from '#src/view/view';
import { BasketProduct } from '../catalog/components/types';
import CartProductsView from './cart-products-view';
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
  }

  private createComponents(): void {
    const cart = cartState.getCart();
    if (cart) {
      const productsInCart = new CartProductsView();
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
    }
  }

  private createTotal(price: CentPrecisionMoney): void {
    this.totalPrice = new PriceView({ value: price }, 'Total price');
    this.basicComponent.addInnerElement(this.totalPrice);
  }
}
