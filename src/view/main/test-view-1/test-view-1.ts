import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import View from '#src/view/view';

import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import Content from '#src/components/basic_structure/content';
import TextContentEnum from '#src/components_params/text-content-enum';

const viewParams: BasicComponentConstructorArgs = {
  tagName: TagsEnum.PARAGRAPH,
  classNames: ClassesEnum.PLACEHOLDER,
  textContent: TextContentEnum.PLACEHOLDER_1,
};

/**
 * Test view component 1.
 */
export default class TestView1 extends View {
  constructor() {
    super(viewParams);
    this.configureView();
  }

  private configureView(): void {
    const content = new Content();

    this.basicComponent.addInnerElement(content);
  }
}
