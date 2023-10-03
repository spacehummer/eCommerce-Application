import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import { ViewLogicParams } from '#src/view/view';

import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import NavItemLinkView from '#src/view/header/navigation/nav-item-link-view';
import { PageParams } from '#src/types/types';

import { PagesNames, pagesSequence, PagesUrls } from '#src/logic/router/pages-params';
import { addStateListener } from '#src/logic/state/state';
import { isAvailablePage } from '#src/logic/router/routes-filter';
import BaseNavMenu from './base-nav-menu';
import baseNavItemLinkView, { LinkComponents } from './base-nav-item-link-view';

const viewParams: BasicComponentConstructorArgs = {
  tagName: TagsEnum.NAV,
  classNames: ClassesEnum.NAV_MENU,
};

/**
 * Navigation menu view component.
 */
export default class NavMenuView extends BaseNavMenu {
  protected get navMenuListParams(): BasicComponentConstructorArgs {
    return {
      tagName: TagsEnum.MARKED_LIST,
      classNames: ClassesEnum.NAV_MENU_LIST,
    };
  }

  protected get navMenuListItemParams(): BasicComponentConstructorArgs {
    return {
      tagName: TagsEnum.LIST_ITEM,
      classNames: ClassesEnum.NAV_MENU_LIST_ITEM,
    };
  }

  protected createNewLink(
    pageParams: PageParams,
    linkComponents: LinkComponents
  ): baseNavItemLinkView {
    return new NavItemLinkView(pageParams, linkComponents);
  }

  constructor(logicParams: ViewLogicParams) {
    super(viewParams, logicParams, {
      names: PagesNames,
      keySequence: pagesSequence,
      paths: PagesUrls,
    });

    this.setStateListeners();
    // hide authorized links
    this.showHideAvailableLinks();
  }

  private setStateListeners(): void {
    addStateListener('login', this.showHideAvailableLinks);
    addStateListener('logout', this.showHideAvailableLinks);
  }

  private readonly showHideAvailableLinks = (): void => {
    pagesSequence.forEach((page) => {
      const link = this.linkComponents.get(PagesUrls[page]);
      if (isAvailablePage(page)) {
        (link as NavItemLinkView).show();
      } else {
        (link as NavItemLinkView).hide();
      }
    });
  };
}
