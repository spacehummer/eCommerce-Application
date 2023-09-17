import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import View, { ViewLogicParams } from '#src/view/view';
import cartState from '#src/logic/state/cartState';
import ProductCartView from './product-cart';
import AddToCartForm, { AddCartFileds } from '../../basket/components/add-to-cart-form';
import CartModel from '../../basket/cart-model';
import { ProductCredentials } from '../../basket/components/types';
import { ProductCart } from './types';

const args: BasicComponentConstructorArgs = {
  classNames: ClassesEnum.ONLY_FOR_DRAFT_CODE,
  tagName: TagsEnum.CONTAINER,
};

export default class ProductsView extends View {
  protected productCarts?: { [index: string]: ProductCartView };

  protected readonly cartModel: CartModel;

  constructor(logicParams?: ViewLogicParams) {
    super(args, logicParams);

    this.cartModel = new CartModel();
  }

  public setProducts(prods: ProductCart[]): void {
    this.replaceCarts(this.createCarts(prods));
  }

  protected replaceCarts(newElems: HTMLElement[]): void {
    this.basicComponent.htmlElement?.replaceChildren(...newElems);
  }

  protected callback(record: Record<string, string | Record<string, string>>): void {
    const { [AddCartFileds.ProductId]: productId } = record;
    this.disableCart(productId as string);
    this.cartModel.apiCall(productId);
  }

  protected factory(values: ProductCredentials): AddToCartForm {
    return new AddToCartForm(this.callback.bind(this), values);
  }

  private disableCart(productId: string): void {
    if (this.productCarts) {
      const cart = this.productCarts[productId];
      if (cart.addToCartFrom) cart?.addToCartFrom.disable();
    }
  }

  private createCarts(prods: ProductCart[]): HTMLElement[] {
    this.productCarts = {};
    const basket = cartState.getCart();
    return prods.map((prod: ProductCart) => {
      const cart = new ProductCartView(prod, this.factory.bind(this));
      cart.mount();
      if (this.productCarts) this.productCarts[cart.id] = cart;
      if (
        basket &&
        cart.addToCartFrom &&
        basket.lineItems.findIndex((item) => item.productId === prod.id) !== -1
      )
        cart.addToCartFrom.disable();
      return cart.basicComponent.htmlElement as HTMLElement;
    });
  }
}
