import { BasicComponentConstructorArgs } from "#src/components/basic-component";
import ClassesEnum from "#src/components_params/classes-enum";
import TagsEnum from "#src/components_params/tags-enum";
import { PageParams } from "#src/types/types";
import baseNavItemLinkView, { LinkComponents } from "#src/view/header/navigation/base-nav-item-link-view";
import BaseNavMenu, { NavMenuParams } from "#src/view/header/navigation/base-nav-menu";
import { ViewLogicParams } from "#src/view/view";
import CategoryLink from "./category-link";

const args: BasicComponentConstructorArgs = {
    classNames: ClassesEnum.ONLY_FOR_DRAFT_CODE,
    tagName: TagsEnum.CONTAINER
}

export class CategoryNav extends BaseNavMenu {
    protected get navMenuListParams(): BasicComponentConstructorArgs {
        return {
            classNames: ClassesEnum.ONLY_FOR_DRAFT_CODE,
            tagName: TagsEnum.MARKED_LIST,
        }
    }
    protected get navMenuListItemParams(): BasicComponentConstructorArgs {
        return {
            classNames: ClassesEnum.ONLY_FOR_DRAFT_CODE,
            tagName: TagsEnum.LIST_ITEM,
        }
    }

    constructor(logicParams: ViewLogicParams, navArgs: NavMenuParams) {
        super(args, logicParams, navArgs)
    }

    protected createNewLink(pageParams: PageParams, linkComponents: LinkComponents): baseNavItemLinkView {
        return new CategoryLink(pageParams, linkComponents)
    }
}