import ProductsView from '../catalog/components/product-view';
import { BasketProduct } from '../catalog/components/types';
import BasketProductCart from './basket-product-cart';
import AddToCartForm from './components/add-to-cart-form';
import ModifyQuantity from './components/modify-quantiy-form';
import { BasketProductCredentials } from './components/types';

export default class BasketProductsView extends ProductsView {
  protected callback(): void { }

  public setBasketProducts(prods: BasketProduct[]): void {
    this.replaceCarts(this.createBasketCarts(prods));
  }

  protected factory(values: BasketProductCredentials): AddToCartForm {
    return new ModifyQuantity(this.callback.bind(this), values)
  }

  protected createBasketCarts(prods: BasketProduct[]): HTMLElement[] {
    this.productCarts = {};
    return prods.map((prod: BasketProduct) => {
      const cart = new BasketProductCart(prod, this.factory.bind(this));
      cart.createAddToBasket()
      cart.mount();
      if (this.productCarts) this.productCarts[cart.id] = cart;
      return cart.basicComponent.htmlElement as HTMLElement;
    });
  }
}
