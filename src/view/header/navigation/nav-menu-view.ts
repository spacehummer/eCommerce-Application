import { BasicComponent, BasicComponentConstructorArgs } from '#src/components/basic-component';
import View from '#src/view/view';

import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import NavItemLinkView, { LinkElements } from '#src/view/header/navigation/nav-item-link-view';
import { PageParams } from '#src/types/types';
import { route } from '#src/routing/router';

const viewParams: BasicComponentConstructorArgs = {
  tagName: TagsEnum.NAV,
  classNames: ClassesEnum.NAV_MENU,
};

/**
 * Navigation menu view component.
 */
export default class NavMenuView extends View {
  public pageParams: PageParams | null;

  private linkElements: LinkElements;

  constructor() {
    super(viewParams);

    this.pageParams = null;
    this.linkElements = new Map<string, NavItemLinkView>();

    this.configureView();
  }

  private constructLink(component: BasicComponent, name: string, path: string): void {
    this.pageParams = {
      name,
      callback: (): void => {
        route();
      },
    };

    const newLink = new NavItemLinkView(this.pageParams, this.linkElements);
    newLink.basicComponent.setComponentAttribute('href', path);

    component.addInnerElement(newLink);

    this.linkElements = new Map<string, NavItemLinkView>([['Some String', newLink]]);
  }

  private configureView(): void {
    const navMenuListParams = {
      tagName: TagsEnum.MARKED_LIST,
      classNames: ClassesEnum.NAV_MENU_LIST,
    };
    const navMenuList = new BasicComponent(navMenuListParams);

    const navMenuListItemParams = {
      tagName: TagsEnum.LIST_ITEM,
      classNames: ClassesEnum.NAV_MENU_LIST_ITEM,
    };
    const navMenuListItems = [
      new BasicComponent(navMenuListItemParams),
      new BasicComponent(navMenuListItemParams),
      new BasicComponent(navMenuListItemParams),
    ];

    this.constructLink(navMenuListItems[0], 'Main', '/');
    this.constructLink(navMenuListItems[1], 'Log in', '/#login');
    this.constructLink(navMenuListItems[2], 'Sign up', '/#signup');

    navMenuList.addInnerElement(navMenuListItems[0]);
    navMenuList.addInnerElement(navMenuListItems[1]);
    navMenuList.addInnerElement(navMenuListItems[2]);
    this.basicComponent.addInnerElement(navMenuList);
  }
}
