import { ClientResponse, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import ApiError from '../utils/apiError';
import BaseEndpoint from './baseEndpoint';
import ErrorData from './types/error';

interface IProductRepository {
  getProducts(): unknown | Error;
}

class ProductProjection extends BaseEndpoint implements IProductRepository {
  public async getProducts(filterByCategotyId?: string): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> {
    try {
      const args: Record<string, string | number | string[]> = { limit: 500 };
      if (filterByCategotyId) {
        args.filter = `categories.id: subtree("${filterByCategotyId}")`
      }
      const products = await this.apiRoot
        .withProjectKey({ projectKey: this.projectKey })
        .productProjections()
        .search()
        .get({
          queryArgs: args,
        })
        .execute();

      return products;
    } catch (error) {
      throw new ApiError(error as ErrorData);
    }
  }
}

export default ProductProjection;
