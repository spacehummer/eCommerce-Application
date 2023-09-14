import ClassesEnum from "#src/components_params/classes-enum";
import { PageParams } from "#src/types/types";
import BaseItemLinkView, { LinkComponents } from "#src/view/header/navigation/base-nav-item-link-view";

const classNames = ClassesEnum.NAV_MENU_LIST_ITEM_LINK;
const currentClass = ClassesEnum.ITEM_CURRENT;

export default class CategoryLink extends BaseItemLinkView {
    constructor(pageParams: PageParams, linkComponents: LinkComponents) {
        super(classNames, currentClass, pageParams, linkComponents)
    }
}