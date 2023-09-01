import { BasicComponentConstructorArgs } from "#src/components/basic-component";
import TagsEnum from "#src/components_params/tags-enum";
import { PagesUrls, pagesSequence } from "#src/logic/router/pages-params";
import View, { ViewLogicParams } from "#src/view/view";
import FormComponent from "./form";
import { ApiRequestResult } from "./types";

export default abstract class BaseView extends View {
  protected form?: FormComponent;
  protected successMsg?: string;
  protected title?: string;

  constructor(args: BasicComponentConstructorArgs, logicParams: ViewLogicParams) {
    super(args, logicParams);
  }

  protected createComponents(): void {
    const title = document.createElement(TagsEnum.H2);
    title.textContent = this.title || '';

    this.basicComponent.addInnerElement(title);
    if (this.form) this.basicComponent.addInnerElement(this.form);
  }

  protected showResults = (result: ApiRequestResult) => {
    this.form?.showSubmitResults(this.successMsg || '', result)
    return result;
  }

  protected redirect = (result: ApiRequestResult) => {
    setTimeout(() => {
      if (result.isSuccessful && this.logicParams) this.logicParams.router.navigate(PagesUrls[pagesSequence[0]]);
    }, 5000);
    return result;
  }
}