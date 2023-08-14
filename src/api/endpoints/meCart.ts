import { Cart, CartDraft, ClientResponse, MyCartUpdate } from '@commercetools/platform-sdk';
import APICredentials from '../utils/apiCredentials';
import ErrorData from './types/error';
import {
  CartRemoveItemDraft,
  CartUpdateDraft,
  MyCartRemoveItem,
  ProductDetails,
} from './types/cart';
import BaseEndpoint from './baseEndpoint';

interface ICart {
  createCartForCurrentCustomer(cartDraft: CartDraft): object;
  getActiveCart(): object;
}

class CartRepository extends BaseEndpoint implements ICart {
  private createCartUpdateDraft(cartUpdateDraft: CartUpdateDraft): MyCartUpdate {
    const action = 'addLineItem'; // default value needed to tell the system we are adding an item to cart
    const { version, productId, variantId, quantity } = cartUpdateDraft;
    return {
      version,
      actions: [
        {
          action,
          productId,
          variantId,
          quantity,
        },
      ],
    };
  }

  private createRemoveItemDraft(cartRemoveItemDraft: CartRemoveItemDraft): MyCartRemoveItem {
    const action = 'removeLineItem'; // default value needed to tell the system we are removing an item from the cart
    const { version, lineItemId, quantity } = cartRemoveItemDraft;
    return {
      version,
      actions: [
        {
          action,
          lineItemId,
          quantity,
        },
      ],
    };
  }

  public async createCartForCurrentCustomer(
    cartDraft: CartDraft
  ): Promise<ClientResponse<Cart> | ErrorData> {
    const cart = await this.getActiveCart();
    if (cart?.statusCode === 200) return cart;
    return this.apiRoot
      .withProjectKey({ projectKey: this.projectKey })
      .me()
      .carts()
      .post({
        body: cartDraft,
      })
      .execute()
      .catch((error: ErrorData) => error);
  }

  public async getActiveCart(): Promise<ClientResponse<Cart> | ErrorData> {
    return this.apiRoot
      .withProjectKey({ projectKey: this.projectKey })
      .me()
      .activeCart()
      .get()
      .execute()
      .catch((error: ErrorData) => error);
  }

  public async updateActiveCart(
    productDetails: ProductDetails
  ): Promise<ClientResponse<Cart> | ErrorData> {
    let { cartId } = productDetails;
    const { cartUpdateDraft } = productDetails;
    // if cartId is undefined create an anonymous cart
    if (!cartId) {
      const res = await this.createCartForCurrentCustomer({
        currency: APICredentials.DEFAULT_CURRENCY,
      });
      if (!(res instanceof Error)) {
        const { body } = res as ClientResponse<Cart>;
        cartId = body.id;
        cartUpdateDraft.version = body.version;
      } else return res as ErrorData;
    }

    const updatedCart = await this.apiRoot
      .withProjectKey({ projectKey: this.projectKey })
      .me()
      .carts()
      .withId({ ID: cartId })
      .post({ body: this.createCartUpdateDraft(cartUpdateDraft) })
      .execute()
      .catch((error: ErrorData) => error);

    return updatedCart;
  }

  public async removeLineItem(
    productDetails: CartRemoveItemDraft
  ): Promise<ClientResponse<Cart> | ErrorData> {
    const { body } = (await this.getActiveCart()) as ClientResponse<Cart>;
    const updatedCart = await this.apiRoot
      .withProjectKey({ projectKey: this.projectKey })
      .me()
      .carts()
      .withId({ ID: body.id })
      .post({ body: this.createRemoveItemDraft(productDetails) })
      .execute()
      .catch((error: ErrorData) => error);

    return updatedCart;
  }
}

export default CartRepository;
