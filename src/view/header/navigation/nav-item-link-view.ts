import ClassesEnum from '#src/components_params/classes-enum';
import { PageParams } from '#src/types/types';
import BaseItemLinkView, { LinkComponents } from './base-nav-item-link-view';

const classNames = ClassesEnum.NAV_MENU_LIST_ITEM_LINK;
const currentClass = ClassesEnum.ITEM_CURRENT;

export default class NavItemLinkView extends BaseItemLinkView {
  constructor(pageParams: PageParams, linkComponents: LinkComponents) {
    super(classNames, currentClass, pageParams, linkComponents);
  }

  public show(): void {
    this.basicComponent.getHTMLElement()?.classList.remove(ClassesEnum.HIDDEN);
  }

  public hide(): void {
    this.basicComponent.getHTMLElement()?.classList.add(ClassesEnum.HIDDEN);
  }
}
