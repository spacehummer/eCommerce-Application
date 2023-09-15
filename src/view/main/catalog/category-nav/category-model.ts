import Api from "#src/api/api";
import { Category } from "#src/api/endpoints/types/category";
import ApiError from "#src/api/utils/apiError";
import { ApiRequestResult } from "../../signup-login/components/types";

export type CategoryApiResponse = Readonly<{
  response?: Category[];
}> &
  ApiRequestResult;

export default class CategoryModel {
  protected readonly api: Api;

  constructor() {
    this.api = new Api();
  }

  public async apiCall(): Promise<CategoryApiResponse> {
    try {
      const response = await this.api.getCategories();
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