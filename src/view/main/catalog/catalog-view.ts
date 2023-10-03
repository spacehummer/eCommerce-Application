import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import View, { ViewLogicParams } from '#src/view/view';
import CategoryRouter from './category-nav/category-router';
import CategoryView from './category-nav/category-view';
import ProductsView from './components/product-view';

const args: BasicComponentConstructorArgs = {
  classNames: ClassesEnum.ONLY_FOR_DRAFT_CODE,
  tagName: TagsEnum.SECTION,
};

export default class CatalogView extends View {
  private readonly prodView: ProductsView;

  private readonly categoryRouter: CategoryRouter;

  private readonly categoryView: CategoryView;

  constructor(logicParams: ViewLogicParams) {
    super(args, logicParams);

    this.prodView = new ProductsView();
    this.categoryRouter = new CategoryRouter(this.prodView);
    this.categoryView = new CategoryView({ router: this.categoryRouter });

    this.getAllProds();

    this.basicComponent.addInnerElement(this.categoryView);
    this.basicComponent.addInnerElement(this.prodView);
  }

  private getAllProds(): void {
    this.categoryRouter.getAllProducts().then(this.prodView.setProducts.bind(this.prodView));
  }
}
