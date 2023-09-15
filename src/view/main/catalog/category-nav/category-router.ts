import { Router } from '#src/logic/router/route-types';
import { ProductProjection } from '@commercetools/platform-sdk';
import ProductModel, { ProductApiResponse } from '../components/product-model';
import ProductsView from '../components/product-view';

const model = new ProductModel()

export default class CategoryRouter implements Router {
  private readonly setProducts: (prods: ProductProjection[]) => void;
  constructor(protected readonly prodView: ProductsView) {
    this.setProducts = this.prodView.setPorducts.bind(this.prodView);
  }

  public navigate(path: string): void {
    model.apiCall(path).then(this.getProducts).then(this.setProducts);
  }

  private getProducts(value: ProductApiResponse): ProductProjection[] {
    if (value.response?.body.results) {
      return value.response.body.results
    } else {
      return []
    }
  }

  public async getAllProducts(): Promise<ProductProjection[]> {
    const result = await model.apiCall();
    return this.getProducts(result)
  }
}
