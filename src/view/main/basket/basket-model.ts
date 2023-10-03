import { Cart, ClientResponse } from '@commercetools/platform-sdk';
import Api from '#src/api/api';
import {
  CartDiscountCodeDraft,
  CartQuantityDraft,
  CartRemoveItemDraft,
} from '#src/api/endpoints/types/cart';
import ApiError from '#src/api/utils/apiError';
import cartState from '#src/logic/state/cartState';
import { ApiRequestResult } from '../signup-login/components/types';

export type CartApiResponse = Readonly<{
  response?: ClientResponse<Cart>;
}> &
  ApiRequestResult;

export default class BasketModel {
  protected readonly api: Api;

  constructor() {
    this.api = new Api();
  }

  protected updateCart(cart: ClientResponse<Cart>): ClientResponse<Cart> {
    cartState.setCart(cart.body);
    return cart;
  }

  public async applyDiscountCode(codeDraft: CartDiscountCodeDraft): Promise<CartApiResponse> {
    return this.apiCall(this.api.applyDiscountCode(codeDraft).then(this.updateCart));
  }

  public async removeItemFromCart(itemDraft: CartRemoveItemDraft): Promise<ClientResponse<Cart>> {
    return this.api.removeFromCart(itemDraft).then(this.updateCart);
  }

  public async clearCart(): Promise<CartApiResponse> {
    return this.apiCall(this.api.clearCart().then(this.updateCart));
  }

  public async updateQuantity(quantityDraft: CartQuantityDraft): Promise<CartApiResponse> {
    return this.apiCall(this.api.updateCartItemQuantity(quantityDraft).then(this.updateCart));
  }

  public async apiCall(apiRequest: Promise<ClientResponse<Cart>>): Promise<CartApiResponse> {
    try {
      const response = await apiRequest;
      return {
        isSuccessful: true,
        response,
      };
    } catch (error) {
      if (error instanceof ApiError) {
        return {
          isSuccessful: false,
          error: error.data.body.errors,
          errorMsg: error.message,
        };
      }
      throw error;
    }
  }
}
