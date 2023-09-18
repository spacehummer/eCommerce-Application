import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import View from '#src/view/view';

const args: BasicComponentConstructorArgs = {
  tagName: TagsEnum.SECTION,
  classNames: ClassesEnum.ONLY_FOR_DRAFT_CODE,
};

export default class AboutUsView extends View {
  constructor() {
    super(args);

    this.createTitle();
  }

  private createTitle(): void {
    const title = document.createElement(TagsEnum.H2);
    title.textContent = 'About us';

    this.basicComponent.addInnerElement(title);
  }
}
