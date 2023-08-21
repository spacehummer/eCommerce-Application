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
export default class NotFoundView extends View {
  constructor() {
    super(viewParams);

    const title = document.createElement('h2');
    title.textContent = '404 NOT FOUND';
    title.style.justifyContent = 'center';
    title.style.display = 'flex';
    this.basicComponent.addInnerElement(title);
  }
}
