import {
  Cart,
  ClientResponse,
  Customer,
  CustomerSignInResult,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';
import { UserAuthOptions } from '@commercetools/sdk-client-v2';
import AuthService from './utils/authService';
import CartRepository from './endpoints/meCart';
import CustomerRepository from './endpoints/meCustomer';
import ProductProjection from './endpoints/productProjection';
import { CartRemoveItemDraft } from './endpoints/types/cart';
import CustomerData, { PersonalesDto } from './endpoints/types/customer';

const authService = new AuthService();
const cart = new CartRepository(authService);
const customer = new CustomerRepository(authService);
const product = new ProductProjection(authService);

class Api {
  public async getProducts(): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> {
    return product.getProducts();
  }

  public async login(credentials: UserAuthOptions): Promise<ClientResponse<CustomerSignInResult>> {
    authService.login(credentials);
    return customer.getCustomer({
      email: credentials.username,
      password: credentials.password,
    });
  }

  public async updatePersonales(updateDto: PersonalesDto): Promise<ClientResponse<Customer>> {
    const dto = customer.createUpdatePersonalesDraft(updateDto);
    return customer.updateCustomer(dto);
  }

  public async logout(): Promise<void> {
    authService.logout();
  }

  public async signUp(user: CustomerData): Promise<ClientResponse<CustomerSignInResult>> {
    const draftUser = customer.createCustomerDraft(user);
    return customer.createCustomer(draftUser);
  }

  public async getActiveCartOrCreateIt(): Promise<ClientResponse<Cart>> {
    return cart.getActiveCartOrCreateIt();
  }

  public async createCart(currency: string): Promise<ClientResponse<Cart>> {
    return cart.createCartForCurrentCustomer({ currency });
  }

  public async addToCart(
    productId: string,
    variantId: number,
    quantity: number
  ): Promise<ClientResponse<Cart>> {
    return cart.updateActiveCart({
      cartUpdateDraft: { productId, variantId, quantity, version: -1 },
    });
  }

  public async removeFromCart(itemDraft: CartRemoveItemDraft): Promise<ClientResponse<Cart>> {
    return cart.removeLineItem(itemDraft);
  }
}

export default Api;
