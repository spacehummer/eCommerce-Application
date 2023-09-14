import {
  Cart,
  Category as CategorySdk,
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
import CustomerData, {
  AddressDto,
  ChangePasswordDto,
  DeleteAddressDto,
  PersonalesDto,
} from './endpoints/types/customer';
import Category from './endpoints/category';
import { Category as CategoryDto, LocaleString } from './endpoints/types/category';

const authService = new AuthService();
const cart = new CartRepository(authService);
const customer = new CustomerRepository(authService);
const product = new ProductProjection(authService);
const category = new Category(authService);

class Api {
  public async getProducts(
    filterByCategotyId?: string
  ): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> {
    return product.getProducts(filterByCategotyId);
  }

  public async login(credentials: UserAuthOptions): Promise<ClientResponse<CustomerSignInResult>> {
    authService.login(credentials);
    return customer.getCustomer({
      email: credentials.username,
      password: credentials.password,
    });
  }

  public async changePassword(passwordDto: ChangePasswordDto): Promise<ClientResponse<Customer>> {
    return customer.changePassword(passwordDto);
  }

  public async updatePersonales(updateDto: PersonalesDto): Promise<ClientResponse<Customer>> {
    const dto = customer.createUpdatePersonalesDraft(updateDto);
    return customer.updateCustomer(dto);
  }

  public async updateAddress(addressDto: AddressDto): Promise<ClientResponse<Customer>> {
    const dto = customer.createUpdateAddressDraft(addressDto);
    return customer.updateCustomer(dto);
  }

  public async deleteAddress(addressDto: DeleteAddressDto): Promise<ClientResponse<Customer>> {
    const dto = customer.createDeleteAddressDraft(addressDto);
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

  private getLocalString(local: { [key: string]: string }): LocaleString {
    return {
      ru: local.ru,
      en: local.en,
    };
  }

  private mapCategory(categoryToMap: CategorySdk): CategoryDto {
    return {
      childrens: [],
      id: categoryToMap.id,
      key: categoryToMap.key,
      name: this.getLocalString(categoryToMap.name),
      slug: this.getLocalString(categoryToMap.slug),
      description: this.getLocalString(categoryToMap.slug),
      ancestors: categoryToMap.ancestors,
      parent: categoryToMap.parent,
    };
  }

  public async getCategories(): Promise<CategoryDto[]> {
    const categories = await category.getCategories();
    const result: CategoryDto[] = [];
    categories.body.results.forEach((resItem) => {
      if (resItem.parent) {
        const parent = result.find((curr) => curr.id === resItem.parent?.id);
        if (parent) {
          parent.childrens.push(this.mapCategory(resItem));
        }
      } else {
        result.push(this.mapCategory(resItem));
      }
    });
    return result;
  }
}

export default Api;
