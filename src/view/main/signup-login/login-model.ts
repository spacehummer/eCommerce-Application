import { Cart, ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk';
import Api from '#src/api/api';
import ApiError from '#src/api/utils/apiError';
import { setProfile } from '#src/logic/state/state';
import cartState from '#src/logic/state/cartState';
import { ApiRequestResult } from './components/types';

export default class LoginModel {
  private readonly api = new Api();

  public async login(username: string, password: string): Promise<ApiRequestResult> {
    try {
      await this.api
        .login({ username, password })
        .then(async (response: ClientResponse<CustomerSignInResult>) => {
          setProfile(response.body.customer);
          if (response.body.cart) {
            cartState.setCart(response.body.cart);
          } else {
            return this.api.getActiveCartOrCreateIt();
          }
          return undefined;
        })
        .then((response?: ClientResponse<Cart>) => {
          if (response) {
            cartState.setCart(response.body);
          }
        });
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
