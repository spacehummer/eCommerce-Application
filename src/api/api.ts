import {
  Cart,
  ClientResponse,
  CustomerSignInResult,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';
import { UserAuthOptions } from '@commercetools/sdk-client-v2';
import AuthService from './utils/authService';
import CartRepository from './endpoints/meCart';
import CustomerRepository from './endpoints/meCustomer';
import ProductProjection from './endpoints/productProjection';
import { CartRemoveItemDraft } from './endpoints/types/cart';
import CustomerData from './endpoints/types/customer';

const authService = new AuthService();
const cart = new CartRepository(authService);
const customer = new CustomerRepository(authService);
const product = new ProductProjection(authService);

class Api {
  public async getProducts(): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> {
    const result = await product.getProducts();
    return (await product.getProducts()) as ClientResponse<ProductProjectionPagedQueryResponse>;
    return result as ClientResponse<ProductProjectionPagedQueryResponse>;
  }

  public async login(credentials: UserAuthOptions): Promise<ClientResponse<CustomerSignInResult>> {
    authService.login(credentials);
    const result = await customer.getCustomer({
      email: credentials.username,
      password: credentials.password,
    });
    return result as ClientResponse<CustomerSignInResult>;
  }

  public async logout(): Promise<void> {
    authService.logout();
  }

  public async signUp(user: CustomerData): Promise<ClientResponse<CustomerSignInResult>> {
    const draftUser = customer.createCustomerDraft(user);
    return (await customer.createCustomer(draftUser)) as ClientResponse<CustomerSignInResult>;
  }

  public async getCart(currency: string): Promise<ClientResponse<Cart>> {
    return (await cart.createCartForCurrentCustomer({ currency })) as ClientResponse<Cart>;
  }

  public async addToCart(
    productId: string,
    variantId: number,
    quantity: number
  ): Promise<ClientResponse<Cart>> {
    return (await cart.updateActiveCart({
      cartUpdateDraft: { productId, variantId, quantity, version: -1 },
    })) as ClientResponse<Cart>;
  }

  public async removeFromCart(itemDraft: CartRemoveItemDraft): Promise<ClientResponse<Cart>> {
    return (await cart.removeLineItem(itemDraft)) as ClientResponse<Cart>;
  }
}

export default Api;
