import Api from '#src/api/api';
import CustomerData from '#src/api/endpoints/types/customer';
import ApiError from '#src/api/utils/apiError';
import { setProfile } from '#src/logic/state/profile';
import { ApiRequestResult } from './components/types';

export default class SignUpModel {
  private readonly api: Api;

  constructor() {
    this.api = new Api();
  }

  public async signUp(data: CustomerData): Promise<ApiRequestResult> {
    try {
      await this.api.signUp(data);
      const response = await this.api.login({ password: data.password, username: data.email });
      setProfile(response.body.customer);
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
