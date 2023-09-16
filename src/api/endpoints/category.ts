import { ClientResponse, CategoryPagedQueryResponse } from '@commercetools/platform-sdk';
import ApiError from '../utils/apiError';
import BaseEndpoint from './baseEndpoint';
import ErrorData from './types/error';

export default class Category extends BaseEndpoint {
  public async getCategories(): Promise<ClientResponse<CategoryPagedQueryResponse>> {
    try {
      return await this.apiRoot
        .withProjectKey({ projectKey: this.projectKey })
        .categories()
        .get({ queryArgs: { limit: 500, sort: 'orderHint' } })
        .execute();
    } catch (error) {
      throw new ApiError(error as ErrorData);
    }
  }
}
