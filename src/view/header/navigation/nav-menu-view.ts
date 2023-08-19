import { BasicComponent, BasicComponentConstructorArgs } from '#src/components/basic-component';
import View from '#src/view/view';

import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import TextContentEnum from '#src/components_params/text-content-enum';
import NavItemLinkView, { LinkElements } from '#src/view/header/navigation/nav-item-link-view';
import { PageParams } from '#src/types/types';

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

    navMenuListItems.forEach((component, index) => {
      this.pageParams = {
        name: TextContentEnum.PLACEHOLDER,
        callback: (): void => {
          console.log('Routing request!');
        },
      };

      const newLink = new NavItemLinkView(this.pageParams, this.linkElements);

      component.addInnerElement(newLink);

      this.linkElements.set(`link-${index}`, newLink);
      // this.linkElements = new Map<string, NavItemLinkView>([['Some String', newLink]]);
      console.log(this.linkElements);
    });

    navMenuList.addInnerElement(navMenuListItems[0]);
    navMenuList.addInnerElement(navMenuListItems[1]);
    navMenuList.addInnerElement(navMenuListItems[2]);
    this.basicComponent.addInnerElement(navMenuList);
  }
}
