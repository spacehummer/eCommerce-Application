import { BasicComponentConstructorArgs } from "#src/components/basic-component";
import ClassesEnum from "#src/components_params/classes-enum";
import TagsEnum from "#src/components_params/tags-enum";
import View, { ViewLogicParams } from "#src/view/view";
import { ProductProjection } from "@commercetools/platform-sdk";
import ProductCart from "./product-cart";

const args: BasicComponentConstructorArgs = {
  classNames: ClassesEnum.ONLY_FOR_DRAFT_CODE,
  tagName: TagsEnum.CONTAINER,
};

export default class ProductsView extends View {
  constructor(logicParams?: ViewLogicParams) {
    super(args, logicParams);
  }

  public readonly setPorducts = (prods: ProductProjection[]) => {
    this.basicComponent.htmlElement?.replaceChildren(...this.createCarts(prods))
  }

  private createCarts(prods: ProductProjection[])/* : ProductCart[] */ {
    return prods.map((prod: ProductProjection) => {
      const cart = new ProductCart(prod);
      const comp = cart.basicComponent;
      const elem = comp.htmlElement;
      return elem as HTMLElement
    });
  }
}