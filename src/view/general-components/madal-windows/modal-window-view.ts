import View from '#src/view/view';
import TagsEnum from '#src/components_params/tags-enum';
import ClassesEnum from '#src/components_params/classes-enum';
import { BasicComponent, BasicComponentConstructorArgs } from '#src/components/basic-component';
import TextContentEnum from '#src/components_params/text-content-enum';

const viewParams: BasicComponentConstructorArgs = {
  tagName: TagsEnum.CONTAINER,
  classNames: ClassesEnum.PLACEHOLDER,
  textContent: TextContentEnum.PLACEHOLDER,
};

export default class ModalWindowView extends View {
  private container: BasicComponent | null;

  private headingContainer: BasicComponent | null;

  private content: BasicComponent | null;

  constructor() {
    super(viewParams);

    this.container = null;
    this.headingContainer = null;
    this.content = null;

    this.configureView();
  }

  private configureView(): void {
    const containerParams = {
      tagName: TagsEnum.CONTAINER,
      classNames: ClassesEnum.PLACEHOLDER,
    };
    this.container = new BasicComponent(containerParams);
  }
}
