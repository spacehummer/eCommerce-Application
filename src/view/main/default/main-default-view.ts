import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import View from '#src/view/view';

import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
// import Content from '#src/components/basic_structure/content';
import TextContentEnum from '#src/components_params/text-content-enum';

const viewParams: BasicComponentConstructorArgs = {
  tagName: TagsEnum.CONTAINER,
  classNames: ClassesEnum.PLACEHOLDER,
  textContent: TextContentEnum.PLACEHOLDER_1,
};

/**
 * Main default view component.
 */
export default class MainDefaultView extends View {
  constructor() {
    super(viewParams);
    // this.configureView();
  }

  // private configureView(): void {
  // }
}
