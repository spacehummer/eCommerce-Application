import Api from '#src/api/api';
import ApiError from '#src/api/utils/apiError';
import { ApiRequestResult } from './components/types';

export default class LoginModel {
  private readonly api = new Api();

  public async login(username: string, password: string): Promise<ApiRequestResult> {
    try {
      await this.api.login({ username, password });
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