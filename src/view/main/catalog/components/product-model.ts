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

  public async getProductsInCategory(categoryId: string): Promise<ProductApiResponse> {
    return this.apiCall(this.api.getProductsInCategory(categoryId));
  }

  public async getAllProducts(): Promise<ProductApiResponse> {
    return this.apiCall(this.api.getProducts());
  }

  public async getProductById(productId: string): Promise<ProductApiResponse> {
    return this.apiCall(this.api.getProductById(productId));
  }

  public async apiCall(
    apiRequest: Promise<ClientResponse<ProductProjectionPagedQueryResponse>>
  ): Promise<ProductApiResponse> {
    try {
      const response = await apiRequest;
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
