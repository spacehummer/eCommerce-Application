import { Price, TypedMoney } from '@commercetools/platform-sdk';
import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import View from '#src/view/view';
import PriceComponent from './price';

const args: BasicComponentConstructorArgs = {
  classNames: ClassesEnum.ONLY_FOR_DRAFT_CODE,
  tagName: TagsEnum.CONTAINER,
};

const priceLabel = 'Price';
const discountedLabel = 'Discounted price';

export default class PriceView extends View {
  private readonly price: PriceComponent;

  private discountPrice?: PriceComponent;

  constructor(price: Price) {
    super(args);

    this.price = this.createPrice(priceLabel, price.value);
    if (price.discounted) {
      this.discountPrice = this.createPrice(discountedLabel, price.discounted.value);
    }

    this.basicComponent.addInnerElement(this.price);
  }

  public setPrice(price: Price): void {
    if (price.discounted) {
      const discounted = PriceView.calculatePrice(price.discounted.value);
      if (this.discountPrice) {
        this.discountPrice.setPrice(discounted);
      } else {
        this.discountPrice = new PriceComponent(discountedLabel, discounted);
      }
    } else if (this.discountPrice) {
      this.discountPrice.setPrice('');
    }
    this.price.setPrice(PriceView.calculatePrice(price.value));
  }

  private createPrice(label: string, money: TypedMoney): PriceComponent {
    return new PriceComponent(label, PriceView.calculatePrice(money));
  }

  public static calculatePrice(money: TypedMoney): string {
    if (money.fractionDigits !== 0) {
      return (money.centAmount / 10 ** money.fractionDigits).toFixed(money.fractionDigits);
    }
    return `${money.centAmount}`;
  }
}
