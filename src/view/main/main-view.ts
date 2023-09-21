import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import View from '#src/view/view';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import Content from '#src/components/basic_structure/content';
import checkInstance from '#src/utils/utils';
import ModalWindowView, {
  ModalWindowConfig,
} from '../general-components/modal-windows/modal-window-view';

const viewParams: BasicComponentConstructorArgs = {
  tagName: TagsEnum.MAIN,
  classNames: [ClassesEnum.MAIN],
  textContent: null,
  callback: null,
};

/**
 * Main view component.
 */
export default class MainView extends View {
  private pageViewRoot: Content | null;

  constructor() {
    super(viewParams);

    this.pageViewRoot = null;

    this.configureView();
  }

  private configureView(): void {
    this.pageViewRoot = new Content(ClassesEnum.CONTENT_MAIN);
    console.log(this.pageViewRoot);
    this.basicComponent.addInnerElement(this.pageViewRoot);
  }

  public setNewPageView(newView: View): void {
    const basicComponentHTMLElement = this.pageViewRoot?.getHTMLElement();
    // clear old view components from root
    while (basicComponentHTMLElement?.firstElementChild) {
      basicComponentHTMLElement.firstElementChild.remove();
    }
    // add new view nested page components
    this.pageViewRoot?.addInnerElement(newView);

    // test modal window
    // const modalWindowConfig: ModalWindowConfig = {
    //   type: 'login',
    //   status: 'ok',
    // };
    // this.displayModalWindow(modalWindowConfig);
  }

  public displayModalWindow(modalWindowConfig: ModalWindowConfig): void {
    document.body.append(
      checkInstance(new ModalWindowView(modalWindowConfig).getHTMLElement(), HTMLElement)
    );
  }
}
