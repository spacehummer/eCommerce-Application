import PriceView from '../catalog/components/price-view';
import ProductCartView from '../catalog/components/product-cart';
import { BasketProduct } from '../catalog/components/types';
import EditButton from '../profile/components/edit-btn';
import AddToCartForm from './components/add-to-cart-form';
import { BasketProductCredentials, ProductCredentials } from './components/types';

export default class BasketProductCart extends ProductCartView {
  public itemTotal: PriceView;

  private removeProduct?: EditButton;

  protected get removeProductBtnText(): string {
    return 'Remove from basket';
  }

  constructor(
    protected readonly basketProduct: BasketProduct,
    private factory: (values: BasketProductCredentials) => AddToCartForm
  ) {
    const method = (prodVals: ProductCredentials): AddToCartForm =>
      factory(prodVals as BasketProductCredentials);
    super(basketProduct.product, method);

    const { totalPrice } = basketProduct;

    this.itemTotal = new PriceView(totalPrice, 'Total');
  }

  public createAddToBasket(): void {
    this.addToCartFrom = this.factory({
      quantity: this.basketProduct.quantity,
      id: this.basketProduct.id,
      productId: this.basketProduct.product.id,
    });
  }

  public createRemoveProductBtn(callback: () => void): void {
    this.removeProduct = new EditButton(callback, this.removeProductBtnText);
  }

  public mount(): void {
    super.mount();

    if (this.removeProduct) this.basicComponent.addInnerElement(this.removeProduct);

    this.basicComponent.addInnerElement(this.itemTotal);
  }
}
