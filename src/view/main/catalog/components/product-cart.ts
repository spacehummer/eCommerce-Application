import { Price, ProductProjection, TypedMoney } from '@commercetools/platform-sdk';
import { BasicComponent, BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import View from '#src/view/view';
import { getLang } from '#src/logic/state/state';
import AddToCartForm from '../../basket/components/add-to-cart-form';

const args: BasicComponentConstructorArgs = {
  classNames: ClassesEnum.ONLY_FOR_DRAFT_CODE,
  tagName: TagsEnum.CONTAINER,
};

const productArgs: BasicComponentConstructorArgs = {
  classNames: ClassesEnum.ONLY_FOR_DRAFT_CODE,
  tagName: TagsEnum.PARAGRAPH,
};

export default class ProductCart extends View {
  public readonly addToCartFrom: AddToCartForm;

  constructor(product: ProductProjection) {
    super(args);

    const lang = getLang();

    const {
      id,
      name,
      description,
      masterVariant: { prices },
    } = product;

    const idComponent = new BasicComponent(productArgs);
    idComponent.setTextContent(id);

    const nameComponent = new BasicComponent(productArgs);
    nameComponent.setTextContent(name[lang]);
    const descriptionComponent = new BasicComponent(productArgs);
    descriptionComponent.setTextContent(description?.[lang]);

    const pricesComponent = this.createPrice(prices);

    this.addToCartFrom = new AddToCartForm(() => {}, { productId: id });

    this.basicComponent.addInnerElement(nameComponent);
    this.basicComponent.addInnerElement(descriptionComponent);
    this.basicComponent.addInnerElement(pricesComponent);

    this.basicComponent.addInnerElement(this.addToCartFrom);
  }

  private createPrice(prices?: Price[]): BasicComponent {
    const pricesComponent = new BasicComponent(productArgs);
    if (prices) {
      const [price] = prices;
      let value: string;
      value = `Price: ${this.calculatePrice(price.value)}`;
      if (price.discounted) {
        value += `; discounted price:${this.calculatePrice(price.discounted.value)}`;
      }
      pricesComponent.setTextContent(value);
    }
    return pricesComponent;
  }

  private calculatePrice(money: TypedMoney): string {
    if (money.fractionDigits !== 0) {
      return (money.centAmount / 10 ** money.fractionDigits).toFixed(money.fractionDigits);
    }
    return `${money.centAmount}`;
  }
}
