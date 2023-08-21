import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import View from '#src/view/view';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';

const viewParams: BasicComponentConstructorArgs = {
  tagName: TagsEnum.MAIN,
  classNames: [ClassesEnum.MAIN],
  textContent: null,
  callback: null,
};

/**
 * Main view component.
 */
export default class MainView extends View {
  constructor() {
    super(viewParams);
  }

  public setNewPageView(newView: View): void {
    const basicComponentHTMLElement = this.basicComponent.getHTMLElement();
    // clear old view components from root
    while (basicComponentHTMLElement?.firstElementChild) {
      basicComponentHTMLElement.firstElementChild.remove();
    }
    // add new view nested page components
    this.basicComponent.addInnerElement(newView);
  }
}
