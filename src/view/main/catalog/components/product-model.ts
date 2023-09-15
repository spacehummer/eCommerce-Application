import { ClientResponse, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import Api from '#src/api/api';
import ApiError from '#src/api/utils/apiError';
import { ApiRequestResult } from '../../signup-login/components/types';

export type ProductApiResponse = Readonly<{
  response?: ClientResponse<ProductProjectionPagedQueryResponse>;
}> &
  ApiRequestResult;

export default class ProductModel {
  protected readonly api: Api;

  constructor() {
    this.api = new Api();
  }

  public async apiCall(data?: unknown): Promise<ProductApiResponse> {
    try {
      const categoryId = data as string;
      const response = await this.api.getProducts(categoryId);
      return {
        isSuccessful: true,
        response,
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
