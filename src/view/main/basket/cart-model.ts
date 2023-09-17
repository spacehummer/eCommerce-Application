import { ClientResponse, Cart } from '@commercetools/platform-sdk';
import cartState from '#src/logic/state/cartState';
import BaseModel from '../profile/components/base-model';

export default class CartModel extends BaseModel {
  protected updateCart(cart: ClientResponse<Cart>): ClientResponse<Cart> {
    cartState.setCart(cart.body);
    return cart;
  }

  protected async apiPromiseChain(data: unknown): Promise<void> {
    const productId = data as string;
    const cart = cartState.getCart();
    if (!cart) {
      await this.api.getActiveCartOrCreateIt();
    }
    await this.api.addToCart(productId, 1, 1).then(this.updateCart);
  }
}
