import { LocalizedString, Image } from '@commercetools/platform-sdk';
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

const nameArgs: BasicComponentConstructorArgs = {
  classNames: ClassesEnum.ONLY_FOR_DRAFT_CODE,
  tagName: TagsEnum.H4,
};

export default class ProductCartView extends View {
  public addToCartFrom?: AddToCartForm;

  public readonly id: string;

  protected readonly lang: string;

  protected nameComponent: BasicComponent;

  protected descriptionComponent?: BasicComponent;

  protected pricesComponent?: PriceView;

  protected imageContainer?: HTMLDivElement;

  constructor(
    product: ProductCart,
    private readonly factoryMethod: (values: ProductCredentials) => AddToCartForm,
    style?: ClassesEnum
  ) {
    super({ tagName: args.tagName, classNames: style || args.classNames });

    const lang = getLang();
    this.lang = lang;
    this.id = product.id;
    const {
      name,
      description,
      masterVariant: { prices, images },
    } = product;

    this.nameComponent = this.createComponent(name, nameArgs);

    if (images) this.createImages(images);

    this.basicComponent.addInnerElement(this.nameComponent);
    if (description) {
      this.descriptionComponent = this.createComponent(description, {
        classNames: ClassesEnum.CART_DESCRIPTION,
        tagName: productArgs.tagName,
      });
    }

    if (prices) {
      this.pricesComponent = new PriceView(prices[0]);
    }
  }

  public createAddToBasket(): void {
    this.addToCartFrom = this.factoryMethod({ productId: this.id });
  }

  protected createImages(images: Image[], style: ClassesEnum = ClassesEnum.CART__IMAGE): void {
    const [image] = images;
    if (image) {
      const container = document.createElement(TagsEnum.CONTAINER);
      const img = document.createElement(TagsEnum.IMG);
      img.src = image.url;
      if (style) {
        img.classList.add(style);
        container.classList.add(style);
      }

      container.append(img);
      this.imageContainer = container;
    }
  }

  protected createComponent(
    name: LocalizedString,
    componentArgs: BasicComponentConstructorArgs
  ): BasicComponent {
    const nameComponent = new BasicComponent(componentArgs);
    nameComponent.setTextContent(name[this.lang]);
    return nameComponent;
  }

  public mount(): void {
    this.basicComponent.addInnerElement(this.nameComponent);
    if (this.imageContainer) this.basicComponent.addInnerElement(this.imageContainer);
    if (this.descriptionComponent) this.basicComponent.addInnerElement(this.descriptionComponent);
    if (this.pricesComponent) this.basicComponent.addInnerElement(this.pricesComponent);
    if (this.addToCartFrom) this.basicComponent.addInnerElement(this.addToCartFrom);
  }
}
