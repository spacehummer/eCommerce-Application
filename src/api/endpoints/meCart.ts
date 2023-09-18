import {
  Cart,
  CartDraft,
  ClientResponse,
  MyCartRemoveLineItemAction,
  MyCartUpdate,
  MyCartUpdateAction,
} from '@commercetools/platform-sdk';
import APICredentials from '../utils/apiCredentials';
import ErrorData from './types/error';
import {
  CartActionsDraft,
  CartItemDraft,
  CartQuantityDraft,
  CartRemoveItemDraft,
  CartUpdateDraft,
  MyCartRemoveItem,
  ProductDetails,
} from './types/cart';
import BaseEndpoint from './baseEndpoint';
import ApiError from '../utils/apiError';

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

  private createChangeItemQuantityDraft(quantityDraft: CartQuantityDraft): MyCartUpdateAction {
    const action = 'changeLineItemQuantity';
    const { lineItemId, quantity } = quantityDraft;
    return {
      action,
      lineItemId,
      quantity,
    };
  }

  public async getActiveCartOrCreateIt(): Promise<ClientResponse<Cart>> {
    try {
      const cart = await this.getActiveCart();
      return cart;
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.data.statusCode !== 404) throw error;
      } else throw error;
    }
    return this.createCartForCurrentCustomer({
      currency: APICredentials.DEFAULT_CURRENCY,
      country: APICredentials.DEFAULT_COUNTRY,
    });
  }

  public async createCartForCurrentCustomer(cartDraft: CartDraft): Promise<ClientResponse<Cart>> {
    try {
      return await this.apiRoot
        .withProjectKey({ projectKey: this.projectKey })
        .me()
        .carts()
        .post({
          body: cartDraft,
        })
        .execute();
    } catch (error) {
      throw new ApiError(error as ErrorData);
    }
  }

  public async getActiveCart(): Promise<ClientResponse<Cart>> {
    try {
      return await this.apiRoot
        .withProjectKey({ projectKey: this.projectKey })
        .me()
        .activeCart()
        .get()
        .execute();
    } catch (error) {
      throw new ApiError(error as ErrorData);
    }
  }

  public async changeQuantity(quantityDraft: CartQuantityDraft): Promise<ClientResponse<Cart>> {
    const { id, version } = quantityDraft;
    try {
      return await this.apiRoot
        .withProjectKey({ projectKey: this.projectKey })
        .me()
        .carts()
        .withId({ ID: id })
        .post({ body: { version, actions: [this.createChangeItemQuantityDraft(quantityDraft)] } })
        .execute();
    } catch (error) {
      throw new ApiError(error as ErrorData);
    }
  }

  public async updateActiveCart(productDetails: ProductDetails): Promise<ClientResponse<Cart>> {
    let { cartId } = productDetails;
    const { cartUpdateDraft } = productDetails;
    // if cartId is undefined create an anonymous cart
    if (!cartId) {
      const res = await this.getActiveCartOrCreateIt();
      const { body } = res as ClientResponse<Cart>;
      cartId = body.id;
      cartUpdateDraft.version = body.version;
    }
    try {
      return await this.apiRoot
        .withProjectKey({ projectKey: this.projectKey })
        .me()
        .carts()
        .withId({ ID: cartId })
        .post({ body: this.createCartUpdateDraft(cartUpdateDraft) })
        .execute();
    } catch (error) {
      throw new ApiError(error as ErrorData);
    }
  }

  private createRemoveItemsDraft(cartActionsDraft: CartActionsDraft): MyCartRemoveItem {
    const action = 'removeLineItem'; // default value needed to tell the system we are removing an item from the cart
    const { version, items } = cartActionsDraft;
    const actions = items.map(
      ({ lineItemId }): MyCartRemoveLineItemAction => {
        return {
          action,
          lineItemId,
        };
      }
    );
    return {
      version,
      actions,
    };
  }

  public async cleanActiveCart(): Promise<ClientResponse<Cart>> {
    const {
      body: { id, version, lineItems },
    } = await this.getActiveCart();
    const items = lineItems.map(
      (val): CartItemDraft => {
        return { lineItemId: val.id };
      }
    );
    try {
      return await this.apiRoot
        .withProjectKey({ projectKey: this.projectKey })
        .me()
        .carts()
        .withId({ ID: id })
        .post({ body: this.createRemoveItemsDraft({ id, version, items }) })
        .execute();
    } catch (error) {
      throw new ApiError(error as ErrorData);
    }
  }

  public async removeLineItem(productDetails: CartRemoveItemDraft): Promise<ClientResponse<Cart>> {
    const { body } = await this.getActiveCart();
    try {
      return await this.apiRoot
        .withProjectKey({ projectKey: this.projectKey })
        .me()
        .carts()
        .withId({ ID: body.id })
        .post({ body: this.createRemoveItemDraft(productDetails) })
        .execute();
    } catch (error) {
      throw new ApiError(error as ErrorData);
    }
  }
}

export default CartRepository;
