import View from '#src/view/view';
import TagsEnum from '#src/components_params/tags-enum';
import ClassesEnum from '#src/components_params/classes-enum';
import { BasicComponent, BasicComponentConstructorArgs } from '#src/components/basic-component';
import TextContentEnum from '#src/components_params/text-content-enum';
import AttributesNamesEnum from '#src/components_params/attributes-names-enum';
import PathsObj from '#src/components_params/paths-obj';
import errors from '#src/utils/errors';
import AttributesValuesEnum from '#src/components_params/attributes-values-enum';

const ERRORS = errors.MODAL_WINDOW_VIEW;

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

  private contentAndStyles: ContentAndStyles;

  private container: BasicComponent | null;

  private containerWrp: BasicComponent | null;

  private headingContainer: BasicComponent | null;

  private contentContainer: BasicComponent | null;

  private closeBtn: BasicComponent | null;

  constructor(componentConfig: ModalWindowConfig) {
    super(viewParams);

    this.modalWindowConfig = componentConfig;
    this.contentAndStyles = {
      statusIconPath: '',
      headingText: TextContentEnum.PLACEHOLDER,
      contentText: TextContentEnum.PLACEHOLDER,
      containerClassNames: [ClassesEnum.MODAL_WINDOW_CONTAINER],
      btnClassNames: [ClassesEnum.MODAL_WINDOW_BTN_CLOSE_BASE],
    };

    this.container = null;
    this.containerWrp = null;
    this.headingContainer = null;
    this.contentContainer = null;
    this.closeBtn = null;

    this.generateComponentContentConfig();
    this.configureView();
  }

  /**
   * Set content and styles depends on component config, receiving through constructor.
   * @private
   */
  private generateComponentContentConfig(): void {
    switch (this.modalWindowConfig.type) {
      case 'login': {
        switch (this.modalWindowConfig.status) {
          case 'ok':
            this.contentAndStyles.statusIconPath = PathsObj.MODAL_STATE_ICON_OK;
            this.contentAndStyles.headingText =
              TextContentEnum.MODAL_WINDOW_LOGIN_SUCCESSFUL_HEADING;
            this.contentAndStyles.contentText =
              TextContentEnum.MODAL_WINDOW_LOGIN_SUCCESSFUL_CONTENT;
            this.contentAndStyles.containerClassNames.push(ClassesEnum.MODAL_WINDOW_CONTAINER_OK);
            this.contentAndStyles.btnClassNames.push(ClassesEnum.MODAL_WINDOW_BTN_CLOSE_OK);
            break;
          case 'error':
            this.contentAndStyles.statusIconPath = PathsObj.MODAL_STATE_ICON_ERR;
            this.contentAndStyles.headingText = TextContentEnum.MODAL_WINDOW_LOGIN_ERROR_HEADING;
            this.contentAndStyles.contentText = TextContentEnum.MODAL_WINDOW_LOGIN_ERROR_CONTENT;
            this.contentAndStyles.containerClassNames.push(ClassesEnum.MODAL_WINDOW_CONTAINER_ERR);
            this.contentAndStyles.btnClassNames.push(ClassesEnum.MODAL_WINDOW_BTN_CLOSE_ERR);
            break;
          default:
            console.error(ERRORS.CONFIG_STATUS_INCORRECT());
            break;
        }
        break;
      }
      case 'registration': {
        switch (this.modalWindowConfig.status) {
          case 'ok':
            this.contentAndStyles.statusIconPath = PathsObj.MODAL_STATE_ICON_OK;
            this.contentAndStyles.headingText =
              TextContentEnum.MODAL_WINDOW_REGISTRATION_SUCCESSFUL_HEADING;
            this.contentAndStyles.contentText =
              TextContentEnum.MODAL_WINDOW_REGISTRATION_SUCCESSFUL_CONTENT;
            this.contentAndStyles.containerClassNames.push(ClassesEnum.MODAL_WINDOW_CONTAINER_OK);
            this.contentAndStyles.btnClassNames.push(ClassesEnum.MODAL_WINDOW_BTN_CLOSE_OK);
            break;
          case 'error':
            this.contentAndStyles.statusIconPath = PathsObj.MODAL_STATE_ICON_ERR;
            this.contentAndStyles.headingText =
              TextContentEnum.MODAL_WINDOW_REGISTRATION_ERROR_HEADING;
            this.contentAndStyles.contentText =
              TextContentEnum.MODAL_WINDOW_REGISTRATION_ERROR_CONTENT;
            this.contentAndStyles.containerClassNames.push(ClassesEnum.MODAL_WINDOW_CONTAINER_ERR);
            this.contentAndStyles.btnClassNames.push(ClassesEnum.MODAL_WINDOW_BTN_CLOSE_ERR);
            break;
          default:
            console.error(ERRORS.CONFIG_STATUS_INCORRECT());
            break;
        }
        break;
      }
      default:
        console.error(ERRORS.CONFIG_TYPE_INCORRECT());
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
      classNames: this.contentAndStyles.containerClassNames,
    };
    this.container = new BasicComponent(containerParams);

    this.generateHeadingComponents();
    this.generateContentComponents();

    this.addListeners();

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
    stateIcon.setComponentAttribute(AttributesNamesEnum.SRC, this.contentAndStyles.statusIconPath);

    const headingTextLabelParams = {
      tagName: TagsEnum.SPAN,
      classNames: ClassesEnum.MODAL_WINDOW_HEADING_LABEL,
      textContent: this.contentAndStyles.headingText,
    };
    const headingTextLabel = new BasicComponent(headingTextLabelParams);

    const closeBtnParams = {
      tagName: TagsEnum.BUTTON,
      classNames: this.contentAndStyles.btnClassNames,
      textContent: TextContentEnum.MODAL_WINDOW_BTN_CLOSE_PLACEHOLDER,
    };
    this.closeBtn = new BasicComponent(closeBtnParams);

    stateIconWrp.addInnerElement(stateIcon);

    this.headingContainer.addInnerElement(stateIconWrp);
    this.headingContainer.addInnerElement(headingTextLabel);
    this.headingContainer.addInnerElement(this.closeBtn);
    if (this.container instanceof BasicComponent) {
      this.container.addInnerElement(this.headingContainer);
    } else {
      throw new Error(ERRORS.CONTAINER_INSTANCE_INCORRECT());
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
      textContent: this.contentAndStyles.contentText,
    };
    const contentMsgText = new BasicComponent(contentMsgTextParams);

    this.contentContainer.addInnerElement(contentMsgText);
    if (this.container instanceof BasicComponent) {
      this.container.addInnerElement(this.contentContainer);
    } else {
      throw new Error(ERRORS.CONTAINER_INSTANCE_INCORRECT());
    }
  }

  private addListeners(): void {
    this.container?.setCallback((event) => {
      event?.stopPropagation();
    });

    this.setCloseListener(this.basicComponent);
    if (!(this.closeBtn instanceof BasicComponent)) {
      throw new Error(ERRORS.CLOSE_BTN_INCORRECT(`${this.closeBtn}`));
    }
    this.setCloseListener(this.closeBtn);
  }

  private setCloseListener(component: BasicComponent): void {
    component.setCallback((event) => {
      event?.stopPropagation();
      setTimeout(() => {
        this.basicComponent
          .getHTMLElement()
          ?.setAttribute(AttributesNamesEnum.STYLE, AttributesValuesEnum.STYLE_HIDDEN_HARD);
      }, 100);
    }, 'click');
  }
}
