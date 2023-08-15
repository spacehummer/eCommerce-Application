import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import View from '#src/view/view';
import Content from '#src/components/basic_structure/content';
import TagsEnum from '#src/components_params/tags-enum';
import ClassesEnum from '#src/components_params/classes-enum';

// const text = 'Demo footer';

const viewParams: BasicComponentConstructorArgs = {
  tagName: TagsEnum.FOOTER,
  classNames: ClassesEnum.FOOTER,
  callback: null,
};

/**
 * Footer view component.
 */
export default class FooterView extends View {
  constructor() {
    super(viewParams);
    this.configureView();
  }

  private configureView(): void {
    const content = new Content();

    this.basicComponent.addInnerElement(content);
  }
}
