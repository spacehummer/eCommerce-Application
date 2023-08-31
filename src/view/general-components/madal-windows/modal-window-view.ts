import View from '#src/view/view';
import TagsEnum from '#src/components_params/tags-enum';
import ClassesEnum from '#src/components_params/classes-enum';
import { BasicComponent, BasicComponentConstructorArgs } from '#src/components/basic-component';
import TextContentEnum from '#src/components_params/text-content-enum';

const viewParams: BasicComponentConstructorArgs = {
  tagName: TagsEnum.CONTAINER,
  classNames: ClassesEnum.MODAL_WINDOW_SHADING,
};

export default class ModalWindowView extends View {
  private container: BasicComponent | null;

  private headingContainer: BasicComponent | null;

  private contentContainer: BasicComponent | null;

  constructor() {
    super(viewParams);

    this.container = null;
    this.headingContainer = null;
    this.contentContainer = null;

    this.configureView();
  }

  private configureView(): void {
    const containerParams: BasicComponentConstructorArgs = {
      tagName: TagsEnum.CONTAINER,
      classNames: ClassesEnum.MODAL_WINDOW_CONTAINER,
    };
    this.container = new BasicComponent(containerParams);

    this.generateHeadingContainer();

    // <editor-fold desc="Modal window content components">
    const contentContainerParams = {
      tagName: TagsEnum.CONTAINER,
      classNames: ClassesEnum.PLACEHOLDER,
    };
    this.contentContainer = new BasicComponent(contentContainerParams);

    const contentMsgTextParams = {
      tagName: TagsEnum.PARAGRAPH,
      classNames: ClassesEnum.PLACEHOLDER,
      textContent: TextContentEnum.PLACEHOLDER,
    };
    const contentMsgText = new BasicComponent(contentMsgTextParams);

    this.contentContainer.addInnerElement(contentMsgText);
    this.container.addInnerElement(this.contentContainer);
    // </editor-fold desc="Modal window content components">

    this.basicComponent.addInnerElement(this.container);
  }

  private generateHeadingContainer(): void {
    const headingContainerParams: BasicComponentConstructorArgs = {
      tagName: TagsEnum.CONTAINER,
      classNames: ClassesEnum.MODAL_WINDOW_HEADING_CONTAINER,
    };
    this.headingContainer = new BasicComponent(headingContainerParams);

    const stateIconWrpParams = {
      tagName: TagsEnum.CONTAINER,
      classNames: ClassesEnum.MODAL_WINDOW_STATE_ICON,
    };
    const stateIconWrp = new BasicComponent(stateIconWrpParams);

    const stateIconParams = {
      tagName: TagsEnum.IMG,
      classNames: ClassesEnum.PLACEHOLDER,
    };
    const stateIcon = new BasicComponent(stateIconParams);

    const headingTextLabelParams = {
      tagName: TagsEnum.SPAN,
      classNames: ClassesEnum.PLACEHOLDER,
      textContent: TextContentEnum.PLACEHOLDER,
    };
    const headingTextLabel = new BasicComponent(headingTextLabelParams);

    const closeBtnParams = {
      tagName: TagsEnum.BUTTON,
      classNames: ClassesEnum.PLACEHOLDER,
      textContent: TextContentEnum.PLACEHOLDER,
    };
    const closeBtn = new BasicComponent(closeBtnParams);

    stateIconWrp.addInnerElement(stateIcon);

    this.headingContainer.addInnerElement(stateIconWrp);
    this.headingContainer.addInnerElement(headingTextLabel);
    this.headingContainer.addInnerElement(closeBtn);
    if (this.container instanceof BasicComponent) {
      this.container.addInnerElement(this.headingContainer);
    } else {
      throw new Error(
        'ERR: In ModalWindowView: container must be an instance of the BasicComponent!'
      );
    }
  }
}
