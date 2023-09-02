import {
  ClientResponse,
  CustomerSignInResult,
  CustomerSignin,
  MyCustomerDraft,
  Customer,
  MyCustomerUpdate,
} from '@commercetools/platform-sdk';
import BaseEndpoint from './baseEndpoint';
import ErrorData from './types/error';
import CustomerData, { PersonalesDto } from './types/customer';
import ApiError from '../utils/apiError';

interface ICustomerRepository {
  createCustomerDraft(customerData: CustomerData): object;
  createCustomer(customerData: CustomerData): unknown | never;
  getCustomer({ email, password }: { email: string; password: string }): unknown | never;
}

class CustomerRepository extends BaseEndpoint implements ICustomerRepository {
  public createCustomerDraft(customerData: CustomerData): MyCustomerDraft {
    const { email, password, firstName, lastName, addresses, dateOfBirth } = customerData;

    const billingAddress = customerData.billingAddress
      ? customerData.billingAddress
      : customerData.shippingAddress;

    return {
      email,
      password,

      firstName,
      lastName,
      addresses,

      dateOfBirth,

      defaultShippingAddress: customerData.shippingAddress,
      defaultBillingAddress: billingAddress,
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

  public createUpdatePersonalesDraft({
    version,
    firstName,
    lastName,
    dateOfBirth,
  }: PersonalesDto): MyCustomerUpdate {
    return {
      version,
      actions: [
        {
          action: 'setFirstName',
          firstName,
        },
        {
          action: 'setLastName',
          lastName,
        },
        {
          action: 'setDateOfBirth',
          dateOfBirth,
        },
      ],
    };
  }

  public async updateCustomer(updateDto: MyCustomerUpdate): Promise<ClientResponse<Customer>> {
    try {
      const customer = await this.apiRoot
        .withProjectKey({ projectKey: this.projectKey })
        .me()
        .post({
          body: updateDto,
        })
        .execute();

      return customer;
    } catch (error) {
      throw new ApiError(error as ErrorData);
    }
  }
}

export default CustomerRepository;
