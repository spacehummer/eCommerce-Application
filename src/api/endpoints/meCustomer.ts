import {
  ClientResponse,
  CustomerSignInResult,
  CustomerSignin,
  MyCustomerDraft,
} from '@commercetools/platform-sdk';
import BaseEndpoint from './baseEndpoint';
import ErrorData from './types/error';
import CustomerData from './types/customer';
import ApiError from '../utils/apiError';

interface ICustomerRepository {
  createCustomerDraft(customerData: CustomerData): object;
  createCustomer(customerData: CustomerData): unknown | never;
  getCustomer({ email, password }: { email: string; password: string }): unknown | never;
}

class CustomerRepository extends BaseEndpoint implements ICustomerRepository {
  public createCustomerDraft(customerData: CustomerData): MyCustomerDraft {
    const {
      email,
      password,
      firstName,
      lastName,
      countryCode,
      streetName,
      streetNumber,
      postalCode,
      city,
    } = customerData;

    return {
      email,
      password,

      firstName,
      lastName,
      addresses: [
        {
          country: countryCode,
          streetName,
          streetNumber,
          postalCode,
          city,
        },
      ],

      defaultShippingAddress: 0,
    };
  }

  public async createCustomer(
    customerData: MyCustomerDraft
  ): Promise<ClientResponse<CustomerSignInResult>> {
    try {
      const customer = await this.apiRoot
        .withProjectKey({ projectKey: this.projectKey })
        .me()
        .signup()
        .post({
          body: customerData,
        })
        .execute();

      // check to make sure status is 201
      return customer;
    } catch (error) {
      throw new ApiError(error as ErrorData);
    }
  }

  public async getCustomer({
    email,
    password,
  }: CustomerSignin): Promise<ClientResponse<CustomerSignInResult>> {
    try {
      const customer = await this.apiRoot
        .withProjectKey({ projectKey: this.projectKey })
        .me()
        .login()
        .post({
          body: {
            email,
            password,
            updateProductData: true,
            activeCartSignInMode: 'MergeWithExistingCustomerCart',
          },
        })
        .execute();

      return customer;
    } catch (error) {
      throw new ApiError(error as ErrorData);
    }
  }
}

export default CustomerRepository;
