import { ClientResponse, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import BaseEndpoint from './baseEndpoint';
import ErrorData from './types/error';

interface IProductRepository {
  getProducts(): unknown | Error;
}

class ProductProjection extends BaseEndpoint implements IProductRepository {
  public async getProducts(): Promise<
    ClientResponse<ProductProjectionPagedQueryResponse> | ErrorData
  > {
    try {
      const products = await this.apiRoot
        .withProjectKey({ projectKey: this.projectKey })
        .productProjections()
        .get()
        .execute();

      return products;
    } catch (error) {
      return error as ErrorData;
    }
  }
}

export default ProductProjection;
