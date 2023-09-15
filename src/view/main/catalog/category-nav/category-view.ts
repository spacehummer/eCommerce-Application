import { Category } from "#src/api/endpoints/types/category";
import { BasicComponentConstructorArgs } from "#src/components/basic-component";
import ClassesEnum from "#src/components_params/classes-enum";
import TagsEnum from "#src/components_params/tags-enum";
import { getLang } from "#src/logic/state/state";
import View, { ViewLogicParams } from "#src/view/view";
import CategoryModel, { CategoryApiResponse } from "./category-model";
import { CategoryNav } from "./category-nav-menu";

const args: BasicComponentConstructorArgs = {
  classNames: ClassesEnum.ONLY_FOR_DRAFT_CODE,
  tagName: TagsEnum.CONTAINER,
};

const model = new CategoryModel()

export default class CategoryView extends View {
  constructor(logicParams: ViewLogicParams) {
    super(args, logicParams)

    this.callApi()
  }

  public callApi(): void {
    model.apiCall().then((res: CategoryApiResponse) => {
      if (res.isSuccessful && res.response) {
        this.createNav(res.response)
      }
    })
  }

  private createNav(categories: Category[]) {
    const lang = getLang();
    if (this.logicParams) {
      const names: Record<string, string> = {}
      const paths: Record<string, string> = {}
      const sequence: string[] = []
      categories.forEach((category: Category) => {
        if (lang === 'en') {
          const name = category.name.en
          // const path = category.slug.en
          const id = category.id
          names[name] = name
          paths[name] = id
          sequence.push(name)
        }
        /* if (category.childrens.length > 0){
          this.createNav(category.childrens)
        } else {
          // this.basicComponent.addInnerElement(new CategoryNav(this.logicParams, {names: category.}))
        } */
      });

      const navMenu = new CategoryNav(this.logicParams, { names: names, keySequence: sequence, paths: paths });
      this.basicComponent.addInnerElement(navMenu)
    }
  }
}