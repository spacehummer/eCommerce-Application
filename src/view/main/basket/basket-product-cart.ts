import PriceView from '../catalog/components/price-view';
import ProductCartView from '../catalog/components/product-cart';
import { BasketProduct } from '../catalog/components/types';
import AddToCartForm from './components/add-to-cart-form';
import { ProductCredentials } from './components/types';

export default class BasketProductCart extends ProductCartView {
  private itemTotal: PriceView;

  constructor(
    basketProduct: BasketProduct,
    factoryMethod: (values: ProductCredentials) => AddToCartForm
  ) {
    super(basketProduct.product, factoryMethod);

    const { totalPrice } = basketProduct;

    this.itemTotal = new PriceView(totalPrice, 'Total');
  }

  protected createAddToBasket(): void {}

  public mount(): void {
    super.mount();

    this.basicComponent.addInnerElement(this.itemTotal);
  }
}
