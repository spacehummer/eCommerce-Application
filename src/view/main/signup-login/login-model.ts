import { ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk';
import Api from '#src/api/api';
import ApiError from '#src/api/utils/apiError';
import { setProfile } from '#src/logic/state/state';
import { ApiRequestResult } from './components/types';

export default class LoginModel {
  private readonly api = new Api();

  public async login(username: string, password: string): Promise<ApiRequestResult> {
    try {
      this.api
        .login({ username, password })
        .then((response: ClientResponse<CustomerSignInResult>) =>
          setProfile(response.body.customer)
        );
      return {
        isSuccessful: true,
      };
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.data && error.data.body.statusCode) {
          if (error.data.body.statusCode === 400) {
            return {
              isSuccessful: false,
              error: error.data.body.errors,
              errorMsg: 'Incorrect email or password!',
            };
          }
          return {
            isSuccessful: false,
            error: error.data.body.errors,
            errorMsg: error.message,
          };
        }
        return {
          isSuccessful: false,
          errorMsg: 'Network Error. Check network connection.',
        };
      }
      throw error;
    }
  }
}
