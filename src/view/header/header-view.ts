import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import checkInstance from '#src/utils/utils';
import View, { ViewLogicParams } from '#src/view/view';
import Content from '#src/components/basic_structure/content';
import LogoGeneralView from '#src/view/general-components/logo-general-view';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import NavMenuView from '#src/view/header/navigation/nav-menu-view';

// const text = 'Demo header';

const viewParams: BasicComponentConstructorArgs = {
  tagName: TagsEnum.HEADER,
  classNames: ClassesEnum.HEADER,
  callback: (e: Event | undefined): void => {
    if (e instanceof Event) {
      checkInstance(e.currentTarget, HTMLElement).classList.toggle('demo-red');
      e.stopPropagation();
    }
  },
  eventType: 'mouseenter',
};

/**
 * Header view component.
 */
export default class HeaderView extends View {
  constructor(logicParams: ViewLogicParams) {
    super(viewParams, logicParams);

    this.configureView();
  }

  private configureView(): void {
    const content = new Content([ClassesEnum.CONTENT_HEADER]);
    const logo = new LogoGeneralView();

    if (this.logicParams === null) {
      throw new Error(`ERR: unexpected null value in logicParams!`);
    }
    const navMenu = new NavMenuView(this.logicParams);

    content.addInnerElement(logo);
    content.addInnerElement(navMenu);

    this.basicComponent.addInnerElement(content);
  }
}
