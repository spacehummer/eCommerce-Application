import ProductsView from '../catalog/components/product-view';
import { BasketProduct } from '../catalog/components/types';
import BasketProductCart from './basket-product-cart';

export default class CartProductsView extends ProductsView {
  protected callback(): void {}

  public setBasketProducts(prods: BasketProduct[]): void {
    this.replaceCarts(this.createBasketCarts(prods));
  }

  protected createBasketCarts(prods: BasketProduct[]): HTMLElement[] {
    this.productCarts = {};
    return prods.map((prod: BasketProduct) => {
      const cart = new BasketProductCart(prod, this.factory.bind(this));
      cart.mount();
      if (this.productCarts) this.productCarts[cart.id] = cart;
      return cart.basicComponent.htmlElement as HTMLElement;
    });
  }
}
