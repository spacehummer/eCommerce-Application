import Api from '#src/api/api';
import ApiError from '#src/api/utils/apiError';
import { ApiRequestResult } from '#src/view/main/signup-login/components/types';

export default abstract class BaseModel {
  protected readonly api: Api;

  constructor() {
    this.api = new Api();
  }

  protected abstract apiPromiseChain(data: unknown): Promise<void>;

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
