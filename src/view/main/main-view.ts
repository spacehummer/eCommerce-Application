import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import View from '#src/view/view';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';

const viewParams: BasicComponentConstructorArgs = {
  tagName: TagsEnum.MAIN,
  classNames: [ClassesEnum.MAIN],
  textContent: '',
  callback: null,
};

/**
 * Main view component.
 */
export default class MainView extends View {
  constructor() {
    super(viewParams);
  }
}
