import Api from '#src/api/api';
import CustomerData from '#src/api/endpoints/types/customer';
import ApiError from '#src/api/utils/apiError';

export default class SignUpModel {
  private readonly api: Api;

  constructor() {
    this.api = new Api();
  }

  public async signUp(data: CustomerData): Promise<string> {
    try {
      await this.api.signUp(data);
      await this.api.login({ password: data.password, username: data.email })
      return '';
    } catch (error) {
      if (error instanceof ApiError) {
        return error.message;
      }
      throw error;
    }
  }
}
