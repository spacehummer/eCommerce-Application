import { TypedMoney } from '@commercetools/platform-sdk';
import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import View from '#src/view/view';
import PriceComponent from './price';
import { ProductPrice } from './types';

const args: BasicComponentConstructorArgs = {
  classNames: ClassesEnum.CART_PRICE,
  tagName: TagsEnum.CONTAINER,
};

const discountStyle = ClassesEnum.CART_PRICE__DISCOUNT;

const priceLabel = 'Price';
const discountedLabel = 'Discounted price';

export default class PriceView extends View {
  private readonly price: PriceComponent;

  private discountPrice?: PriceComponent;

  protected get priceLabel(): string {
    return this.argPriceLabel || priceLabel;
  }

  constructor(price: ProductPrice, protected readonly argPriceLabel?: string) {
    super(args);

    this.price = this.createPrice(this.priceLabel, price.value);
    this.basicComponent.addInnerElement(this.price);

    if (price.discounted) {
      this.discountPrice = this.createPrice(discountedLabel, price.discounted.value, discountStyle);
      this.basicComponent.addInnerElement(this.discountPrice);
    }
  }

  public setPrice(price: ProductPrice): void {
    if (price.discounted) {
      const discounted = PriceView.calculatePrice(price.discounted.value);
      if (this.discountPrice) {
        this.discountPrice.setPrice(discounted);
      } else {
        this.discountPrice = new PriceComponent(discountedLabel, discounted, discountStyle);
        this.basicComponent.addInnerElement(this.discountPrice);
      }
    } else if (this.discountPrice) {
      this.discountPrice.setPrice('');
    }
    this.price.setPrice(PriceView.calculatePrice(price.value));
  }

  private createPrice(label: string, money: TypedMoney, style?: ClassesEnum): PriceComponent {
    return new PriceComponent(label, PriceView.calculatePrice(money), style);
  }

  public static calculatePrice(money: TypedMoney): string {
    if (money.fractionDigits !== 0) {
      return (money.centAmount / 10 ** money.fractionDigits).toFixed(money.fractionDigits);
    }
    return `${money.centAmount}`;
  }
}
