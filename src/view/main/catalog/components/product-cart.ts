import { BasicComponent, BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import View from '#src/view/view';
import { Price, ProductProjection, TypedMoney } from '@commercetools/platform-sdk';

const args: BasicComponentConstructorArgs = {
  classNames: ClassesEnum.ONLY_FOR_DRAFT_CODE,
  tagName: TagsEnum.CONTAINER,
};

const productArgs: BasicComponentConstructorArgs = {
  classNames: ClassesEnum.ONLY_FOR_DRAFT_CODE,
  tagName: TagsEnum.PARAGRAPH,
};

export default class ProductCart extends View {
  constructor(product: ProductProjection) {
    super(args)

    const { id, name, description, masterVariant: { prices } } = product;

    const idComponent = new BasicComponent(productArgs)
    idComponent.setTextContent(id)

    const nameComponent = new BasicComponent(productArgs);
    nameComponent.setTextContent(name.en)
    const descriptionComponent = new BasicComponent(productArgs);
    descriptionComponent.setTextContent(description?.en)

    const pricesComponent = this.createPrice(prices)

    this.basicComponent.addInnerElement(nameComponent)
    this.basicComponent.addInnerElement(descriptionComponent)
    this.basicComponent.addInnerElement(pricesComponent)
  }

  private createPrice(prices?: Price[]): BasicComponent {
    const pricesComponent = new BasicComponent(productArgs);
    if (prices) {
      const [price] = prices
      let value: string;
      value = `Price: ${this.calculatePrice(price.value)}`;
      if (price.discounted) {
        value += `; discounted price:${this.calculatePrice(price.discounted.value)}`
      }
      pricesComponent.setTextContent(value)
    }
    return pricesComponent;
  }

  private calculatePrice(money: TypedMoney): string {
    if (money.fractionDigits !== 0) {
      return (money.centAmount / (10 ** money.fractionDigits)).toFixed(money.fractionDigits)
    }
    else {
      return `${money.centAmount}`;
    }
  }
}
