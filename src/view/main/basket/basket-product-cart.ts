import { Image, LineItem, ProductVariant } from '@commercetools/platform-sdk';
import { BasicComponent } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import PriceView from '../catalog/components/price-view';
import ProductCartView from '../catalog/components/product-cart';
import { ProductCart } from '../catalog/components/types';
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
    protected readonly lineItem: LineItem,
    private factory: (values: BasketProductCredentials) => AddToCartForm
  ) {
    const variant: Partial<ProductVariant> = { prices: [lineItem.price] };
    const prod: ProductCart = {
      id: lineItem.productId,
      masterVariant: Object.assign(lineItem.variant, variant), // {basketProduct.variant},
      name: lineItem.name,
      slug: lineItem.productSlug,
    };
    const method = (prodVals: ProductCredentials): AddToCartForm =>
      factory(prodVals as BasketProductCredentials);
    super(prod, method, ClassesEnum.BASKET_CART);

    const price = lineItem.price.value;
    const discounted = lineItem.discountedPricePerQuantity[0]?.discountedPrice;
    const totalPrice =
      lineItem.price.discounted || lineItem.discountedPricePerQuantity[0]
        ? { value: price, discounted }
        : { value: lineItem.totalPrice };

    this.itemTotal = new PriceView(totalPrice, 'Total');
  }

  public createAddToBasket(): void {
    this.addToCartFrom = this.factory({
      quantity: this.lineItem.quantity,
      id: this.lineItem.id,
      productId: this.lineItem.productId,
    });
  }

  protected createImages(images: Image[]): void {
    super.createImages(images, ClassesEnum.BASKET_CART__IMAGE);
  }

  public createRemoveProductBtn(callback: () => void): void {
    this.removeProduct = new EditButton(callback, this.removeProductBtnText);
  }

  public mount(): void {
    if (this.imageContainer) this.basicComponent.addInnerElement(this.imageContainer);

    const basketContent = new BasicComponent({
      tagName: TagsEnum.CONTAINER,
      classNames: ClassesEnum.BASKET_CART__CONTENT,
    });
    basketContent.addInnerElement(this.nameComponent);
    if (this.pricesComponent) basketContent.addInnerElement(this.pricesComponent);
    basketContent.addInnerElement(this.itemTotal);
    this.basicComponent.addInnerElement(basketContent);

    const basketCtrl = new BasicComponent({
      tagName: TagsEnum.CONTAINER,
      classNames: ClassesEnum.BASKET_CART__CTRL,
    });
    if (this.addToCartFrom) basketCtrl.addInnerElement(this.addToCartFrom);
    if (this.removeProduct) basketCtrl.addInnerElement(this.removeProduct);
    this.basicComponent.addInnerElement(basketCtrl);
  }
}
