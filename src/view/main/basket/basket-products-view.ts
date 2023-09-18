import cartState from '#src/logic/state/cartState';
import ProductsView from '../catalog/components/product-view';
import { BasketProduct } from '../catalog/components/types';
import BasketModel from './basket-model';
import BasketProductCart from './basket-product-cart';
import AddToCartForm from './components/add-to-cart-form';
import ModifyQuantity, { BasketItemFields } from './components/modify-quantiy-form';
import { BasketProductCredentials } from './components/types';

const basketModel = new BasketModel();

export default class BasketProductsView extends ProductsView {
  protected callback(record: Record<string, string | Record<string, string>>): void {
    const lineItemId = record[BasketItemFields.BasketItemId] as string;
    const quantity = record[BasketItemFields.Quantity] as string;
    const productId = record[BasketItemFields.ProductId] as string;
    const basket = cartState.getCart();
    if (basket) {
      const { id, version } = basket;
      basketModel
        .updateQuantity({ id, version, lineItemId, quantity: Number.parseInt(quantity, 10) })
        .then((val) => {
          if (val.response) {
            if (this.productCarts) {
              const cart = this.productCarts[productId] as BasketProductCart;
              if (cart) {
                const price = val.response.body.lineItems.find((item) => item.id === lineItemId)
                  ?.totalPrice;
                if (price) cart.itemTotal.setPrice({ value: price });

                cart.addToCartFrom?.showSubmitResults('Quantity changed!', val);
              }
            }
          }
        });
    }
  }

  public setBasketProducts(prods: BasketProduct[]): void {
    this.replaceCarts(this.createBasketCarts(prods));
  }

  protected factory(values: BasketProductCredentials): AddToCartForm {
    return new ModifyQuantity(this.callback.bind(this), values);
  }

  protected createBasketCarts(prods: BasketProduct[]): HTMLElement[] {
    this.productCarts = {};
    return prods.map((prod: BasketProduct) => {
      const cart = new BasketProductCart(prod, this.factory.bind(this));
      cart.createAddToBasket();
      cart.createRemoveProductBtn(() => {
        if (this.productCarts && this.productCarts[cart.id]) delete this.productCarts[cart.id];
        if (cart.basicComponent.htmlElement)
          this.basicComponent.htmlElement?.removeChild(cart.basicComponent.htmlElement);
        const basket = cartState.getCart();
        if (basket) {
          basketModel.removeItemFromCart({ lineItemId: prod.id, version: basket.version });
        }
      });
      cart.mount();
      if (this.productCarts) this.productCarts[cart.id] = cart;
      return cart.basicComponent.htmlElement as HTMLElement;
    });
  }
}
