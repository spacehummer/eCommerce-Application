import { BasicComponent, BasicComponentConstructorArgs } from '#src/components/basic-component';
import View from '#src/view/view';

import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import TextContentEnum from '#src/components_params/text-content-enum';

const viewParams: BasicComponentConstructorArgs = {
  tagName: TagsEnum.NAV,
  classNames: ClassesEnum.NAV_MENU,
};

/**
 * Navigation menu view component.
 */
export default class NavMenuView extends View {
  constructor() {
    super(viewParams);
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
      textContent: TextContentEnum.PLACEHOLDER,
    };
    const navMenuListItems = [
      new BasicComponent(navMenuListItemParams),
      new BasicComponent(navMenuListItemParams),
      new BasicComponent(navMenuListItemParams),
    ];

    navMenuList.addInnerElement(navMenuListItems[0]);
    navMenuList.addInnerElement(navMenuListItems[1]);
    navMenuList.addInnerElement(navMenuListItems[2]);
    this.basicComponent.addInnerElement(navMenuList);
  }
}
