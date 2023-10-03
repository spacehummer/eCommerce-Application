import { ClientResponse, Customer, CustomerSignInResult } from '@commercetools/platform-sdk';
import Api from '#src/api/api';
import ApiError from '#src/api/utils/apiError';
import { setProfile } from '#src/logic/state/state';
import { ApiRequestResult } from '#src/view/main/signup-login/components/types';

export default abstract class BaseModel {
  protected readonly api: Api;

  constructor() {
    this.api = new Api();
  }

  protected abstract apiPromiseChain(data: unknown): Promise<void>;

  protected updateProfile(val: ClientResponse<Customer>): ClientResponse<Customer> {
    setProfile(val.body);
    return val;
  }

  protected signInProfile(
    val: ClientResponse<CustomerSignInResult>
  ): ClientResponse<CustomerSignInResult> {
    setProfile(val.body.customer);
    return val;
  }

  public async apiCall(data: unknown): Promise<ApiRequestResult> {
    try {
      await this.apiPromiseChain(data);
      return {
        isSuccessful: true,
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
