import {
  ClientResponse,
  CustomerSignInResult,
  CustomerSignin,
  MyCustomerDraft,
  Customer,
  MyCustomerUpdate,
  MyCustomerUpdateAction,
} from '@commercetools/platform-sdk';
import BaseEndpoint from './baseEndpoint';
import ErrorData from './types/error';
import CustomerData, {
  AddAddresDto,
  AddressDto,
  ChangePasswordDto,
  DeleteAddressDto,
  PersonalesDto,
} from './types/customer';
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
    email,
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
        {
          action: 'changeEmail',
          email,
        },
      ],
    };
  }

  public async changePassword(passwordDto: ChangePasswordDto): Promise<ClientResponse<Customer>> {
    try {
      const customer = await this.apiRoot
        .withProjectKey({ projectKey: this.projectKey })
        .me()
        .password()
        .post({
          body: passwordDto,
        })
        .execute();

      return customer;
    } catch (error) {
      throw new ApiError(error as ErrorData);
    }
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

  protected createAddressStateAction({
    addressId,
    isBilling,
    isShipping,
    isDefault,
  }: AddressDto): MyCustomerUpdateAction[] {
    const res: MyCustomerUpdateAction[] = [];
    res.push({
      action: isBilling ? 'addBillingAddressId' : 'removeBillingAddressId',
      addressId,
    });
    res.push({
      action: isShipping ? 'addBillingAddressId' : 'removeShippingAddressId',
      addressId,
    });
    if (isDefault) {
      if (isBilling) {
        res.push({
          action: 'setDefaultBillingAddress',
          addressId,
        });
      }
      if (isShipping) {
        res.push({
          action: 'setDefaultShippingAddress',
          addressId,
        });
      }
    }
    return res;
  }

  public createUpdateAddressDraft(dto: AddressDto): MyCustomerUpdate {
    const { addressId, version, country, city, streetName, postalCode } = dto;
    return {
      version,
      actions: [
        {
          addressId,
          action: 'changeAddress',
          address: {
            country,
            city,
            streetName,
            postalCode,
          },
        },
        // ...this.createAddressStateAction(dto),
      ],
    };
  }

  public createDeleteAddressDraft({ addressId, version }: DeleteAddressDto): MyCustomerUpdate {
    return {
      version,
      actions: [
        {
          action: 'removeAddress',
          addressId,
        },
      ],
    };
  }

  public createAddAddressDraft(dto: AddAddresDto): MyCustomerUpdate {
    const { version, country, city, streetName, postalCode } = dto;
    return {
      version,
      actions: [
        {
          action: 'addAddress',
          address: {
            country,
            city,
            streetName,
            postalCode,
          },
        },
      ],
    };
  }
}

export default CustomerRepository;
