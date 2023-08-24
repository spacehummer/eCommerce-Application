import { BasicComponentConstructorArgs } from '#src/components/basic-component';
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
};

/**
 * Header view component.
 */
export default class HeaderView extends View {
  private navMenu: NavMenuView | null;

  constructor(logicParams: ViewLogicParams) {
    super(viewParams, logicParams);

    this.navMenu = null;

    this.configureView();
  }

  private configureView(): void {
    const content = new Content(ClassesEnum.CONTENT_HEADER);
    const logo = new LogoGeneralView();

    if (this.logicParams === null) {
      throw new Error(`ERR: unexpected null value in logicParams!`);
    }
    this.navMenu = new NavMenuView(this.logicParams);

    content.addInnerElement(logo);
    content.addInnerElement(this.navMenu);

    this.basicComponent.addInnerElement(content);
  }

  public setCurrentStatusToLink(newPageUrl: string): void {
    const currentLink = this.navMenu?.linkComponents.get(newPageUrl);
    if (currentLink) {
      currentLink.setCurrentStatus();
    }
  }
}
