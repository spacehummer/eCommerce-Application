import { ClientResponse, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import ApiError from '../utils/apiError';
import BaseEndpoint from './baseEndpoint';
import ErrorData from './types/error';

interface IProductRepository {
  getProducts(): unknown | Error;
}

class ProductProjection extends BaseEndpoint implements IProductRepository {
  public async getProducts(): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> {
    try {
      const products = await this.apiRoot
        .withProjectKey({ projectKey: this.projectKey })
        .productProjections()
        .get({
          queryArgs: { limit: 500 },
        })
        .execute();

      return products;
    } catch (error) {
      throw new ApiError(error as ErrorData);
    }
  }
}

export default ProductProjection;
