import ClassesEnum from '#src/components_params/classes-enum';
import { PageParams } from '#src/types/types';
import BaseItemLinkView, {
  LinkComponents,
} from '#src/view/header/navigation/base-nav-item-link-view';
// import { CategoryNav } from './category-nav-menu';

const classNames = ClassesEnum.NAV_MENU_LIST_ITEM_LINK;
const currentClass = ClassesEnum.ITEM_CURRENT;

export default class CategoryLink extends BaseItemLinkView {
  // protected subLinks?: CategoryNav;

  constructor(pageParams: PageParams, linkComponents: LinkComponents) {
    super(classNames, currentClass, pageParams, linkComponents);
  }

  // public setSubLinks(sub: CategoryNav): void {
  //   this.subLinks = sub;
  //   this.basicComponent.addInnerElement(sub);
  // }

  // protected setListeners(): void {
  //   this.basicComponent.setCallback(this.pageParam.callback, 'click');
  //   /* weak thing: do we need a state manager? */
  //   this.basicComponent.setCallback(this.setCurrentStatus.bind(this), 'click');
  // }
}
