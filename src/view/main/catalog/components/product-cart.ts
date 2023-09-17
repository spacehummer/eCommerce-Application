import { BasicComponent, BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import View from '#src/view/view';
import { getLang } from '#src/logic/state/state';
import AddToCartForm from '../../basket/components/add-to-cart-form';
import { ProductCredentials } from '../../basket/components/types';
import { ProductCart } from './types';
import PriceView from './price-view';

const args: BasicComponentConstructorArgs = {
  classNames: ClassesEnum.ONLY_FOR_DRAFT_CODE,
  tagName: TagsEnum.CONTAINER,
};

const productArgs: BasicComponentConstructorArgs = {
  classNames: ClassesEnum.ONLY_FOR_DRAFT_CODE,
  tagName: TagsEnum.PARAGRAPH,
};

export default class ProductCartView extends View {
  public readonly addToCartFrom: AddToCartForm;

  public readonly id: string;

  constructor(product: ProductCart, factoryMethod: (values: ProductCredentials) => AddToCartForm) {
    super(args);

    const lang = getLang();
    this.id = product.id;
    const {
      name,
      description,
      masterVariant: { prices },
    } = product;

    const idComponent = new BasicComponent(productArgs);
    idComponent.setTextContent(this.id);

    const nameComponent = new BasicComponent(productArgs);
    nameComponent.setTextContent(name[lang]);

    this.addToCartFrom = factoryMethod({ productId: this.id });

    this.basicComponent.addInnerElement(nameComponent);
    if (description) {
      const descriptionComponent = new BasicComponent(productArgs);
      descriptionComponent.setTextContent(description?.[lang]);
      this.basicComponent.addInnerElement(descriptionComponent);
    }

    if (prices) {
      const pricesComponent = new PriceView(prices[0]);
      this.basicComponent.addInnerElement(pricesComponent);
    }

    this.basicComponent.addInnerElement(this.addToCartFrom);
  }
}
