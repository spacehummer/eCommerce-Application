import View from '#src/view/view';
import TagsEnum from '#src/components_params/tags-enum';
import ClassesEnum from '#src/components_params/classes-enum';
import { BasicComponent, BasicComponentConstructorArgs } from '#src/components/basic-component';
import TextContentEnum from '#src/components_params/text-content-enum';
import AttributesNamesEnum from '#src/components_params/attributes-names-enum';
import PathsObj from '#src/components_params/paths-obj';
import errors from '#src/utils/errors';

export interface ModalWindowConfig {
  type: 'login' | 'registration';
  status: 'ok' | 'error';
}

interface ContentAndStyles {
  statusIconPath: string;
  headingText: TextContentEnum;
  contentText: TextContentEnum;
  containerClassNames: ClassesEnum[];
  btnClassNames: ClassesEnum[];
}

const viewParams: BasicComponentConstructorArgs = {
  tagName: TagsEnum.CONTAINER,
  classNames: ClassesEnum.MODAL_WINDOW_SHADING,
};

export default class ModalWindowView extends View {
  private modalWindowConfig: ModalWindowConfig;

  private contentAndStyles: ContentAndStyles | null;

  private container: BasicComponent | null;

  private containerWrp: BasicComponent | null;

  private headingContainer: BasicComponent | null;

  private contentContainer: BasicComponent | null;

  constructor(componentConfig: ModalWindowConfig) {
    super(viewParams);

    this.modalWindowConfig = componentConfig;
    this.contentAndStyles = null;

    this.container = null;
    this.containerWrp = null;
    this.headingContainer = null;
    this.contentContainer = null;

    this.configureView();
  }

  private generateComponentContentConfig(): void {
    switch (this.modalWindowConfig.type) {
      case 'login': {
        switch (this.modalWindowConfig.status) {
          case 'ok':
            break;
          case 'error':
            break;
          default:
            console.log(errors.MODAL_WINDOW_VIEW.CONFIG_STATUS_INCORRECT(true));
            break;
        }
        break;
      }
      case 'registration': {
        switch (this.modalWindowConfig.status) {
          case 'ok':
            break;
          case 'error':
            break;
          default:
            console.log(errors.MODAL_WINDOW_VIEW.CONFIG_STATUS_INCORRECT(true));
            break;
        }
        break;
      }
      default:
        console.log(errors.MODAL_WINDOW_VIEW.CONFIG_TYPE_INCORRECT(true));
        break;
    }
  }

  private configureView(): void {
    const containerWrpParams: BasicComponentConstructorArgs = {
      tagName: TagsEnum.CONTAINER,
      classNames: ClassesEnum.MODAL_WINDOW_CONTAINER_WRP,
    };
    this.containerWrp = new BasicComponent(containerWrpParams);

    const containerParams: BasicComponentConstructorArgs = {
      tagName: TagsEnum.CONTAINER,
      classNames: ClassesEnum.MODAL_WINDOW_CONTAINER,
    };
    this.container = new BasicComponent(containerParams);

    this.generateHeadingComponents();
    this.generateContentComponents();

    this.containerWrp.addInnerElement(this.container);
    this.basicComponent.addInnerElement(this.containerWrp);
  }

  private generateHeadingComponents(): void {
    const headingContainerParams: BasicComponentConstructorArgs = {
      tagName: TagsEnum.CONTAINER,
      classNames: ClassesEnum.MODAL_WINDOW_HEADING_CONTAINER,
    };
    this.headingContainer = new BasicComponent(headingContainerParams);

    const stateIconWrpParams = {
      tagName: TagsEnum.CONTAINER,
      classNames: ClassesEnum.MODAL_WINDOW_STATE_ICON_WRP,
    };
    const stateIconWrp = new BasicComponent(stateIconWrpParams);

    const stateIconParams = {
      tagName: TagsEnum.IMG,
      classNames: ClassesEnum.MODAL_WINDOW_STATE_ICON,
    };
    const stateIcon = new BasicComponent(stateIconParams);
    stateIcon.setComponentAttribute(AttributesNamesEnum.SRC, PathsObj.MODAL_STATE_ICON_OK);

    const headingTextLabelParams = {
      tagName: TagsEnum.SPAN,
      classNames: ClassesEnum.MODAL_WINDOW_HEADING_LABEL,
      textContent: TextContentEnum.MODAL_WINDOW_LOGIN_SUCCESSFUL_HEADING,
    };
    const headingTextLabel = new BasicComponent(headingTextLabelParams);

    const closeBtnParams = {
      tagName: TagsEnum.BUTTON,
      classNames: ClassesEnum.MODAL_WINDOW_BTN_CLOSE_BASE,
      textContent: TextContentEnum.MODAL_WINDOW_BTN_CLOSE_PLACEHOLDER,
    };
    const closeBtn = new BasicComponent(closeBtnParams);

    stateIconWrp.addInnerElement(stateIcon);

    this.headingContainer.addInnerElement(stateIconWrp);
    this.headingContainer.addInnerElement(headingTextLabel);
    this.headingContainer.addInnerElement(closeBtn);
    if (this.container instanceof BasicComponent) {
      this.container.addInnerElement(this.headingContainer);
    } else {
      throw errors.MODAL_WINDOW_VIEW.containerInstanceIncorrect();
    }
  }

  private generateContentComponents(): void {
    const contentContainerParams = {
      tagName: TagsEnum.CONTAINER,
      classNames: ClassesEnum.MODAL_WINDOW_CONTENT_CONTAINER,
    };
    this.contentContainer = new BasicComponent(contentContainerParams);

    const contentMsgTextParams = {
      tagName: TagsEnum.PARAGRAPH,
      classNames: ClassesEnum.MODAL_WINDOW_CONTENT_PARAGRAPH,
      textContent: TextContentEnum.MODAL_WINDOW_LOGIN_SUCCESSFUL_CONTENT,
    };
    const contentMsgText = new BasicComponent(contentMsgTextParams);

    this.contentContainer.addInnerElement(contentMsgText);
    if (this.container instanceof BasicComponent) {
      this.container.addInnerElement(this.contentContainer);
    } else {
      throw errors.MODAL_WINDOW_VIEW.containerInstanceIncorrect();
    }
  }
}