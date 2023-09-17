import { ProductProjection } from '@commercetools/platform-sdk';
import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import View, { ViewLogicParams } from '#src/view/view';
import ProductCart from './product-cart';
import AddToCartForm, { AddCartFileds } from '../../basket/components/add-to-cart-form';
import CartModel from '../../basket/cart-model';
import { ProductCredentials } from '../../basket/components/types';

const args: BasicComponentConstructorArgs = {
  classNames: ClassesEnum.ONLY_FOR_DRAFT_CODE,
  tagName: TagsEnum.CONTAINER,
};

const cartModel = new CartModel();

export default class ProductsView extends View {
  private productCarts?: { [index: string]: ProductCart };

  constructor(logicParams?: ViewLogicParams) {
    super(args, logicParams);
  }

  public readonly setProducts = (prods: ProductProjection[]): void => {
    this.basicComponent.htmlElement?.replaceChildren(...this.createCarts(prods));
  };

  private callback = (record: Record<string, string | Record<string, string>>): void => {
    const { [AddCartFileds.ProductId]: productId } = record;
    this.disableCart(productId as string);
    cartModel.apiCall(productId);
  };

  private factory = (values: ProductCredentials): AddToCartForm => {
    return new AddToCartForm(this.callback, values);
  };

  private disableCart(productId: string): void {
    if (this.productCarts) {
      const cart = this.productCarts[productId];
      cart.addToCartFrom.disable();
    }
  }

  private createCarts(prods: ProductProjection[]): HTMLElement[] {
    this.productCarts = {};
    return prods.map((prod: ProductProjection) => {
      const cart = new ProductCart(prod, this.factory);
      if (this.productCarts) this.productCarts[cart.id] = cart;
      return cart.basicComponent.htmlElement as HTMLElement;
    });
  }
}
