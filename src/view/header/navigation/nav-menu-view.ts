import { BasicComponent, BasicComponentConstructorArgs } from '#src/components/basic-component';
import View, { ViewLogicParams } from '#src/view/view';

import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import NavItemLinkView, { LinkComponents } from '#src/view/header/navigation/nav-item-link-view';
import { PageParams } from '#src/types/types';

import { PagesNames, pagesSequence, PagesUrls } from '#src/logic/router/pages-params';
import { addStateListener } from '#src/logic/state/state';
import { isAvailablePage } from '#src/logic/router/routes-filter';

const viewParams: BasicComponentConstructorArgs = {
  tagName: TagsEnum.NAV,
  classNames: ClassesEnum.NAV_MENU,
};

/**
 * Navigation menu view component.
 */
export default class NavMenuView extends View {
  public pageParams: PageParams | null;

  public PagesNames: typeof PagesNames;

  public readonly linkComponents: LinkComponents;

  constructor(logicParams: ViewLogicParams) {
    super(viewParams, logicParams);

    this.pageParams = null;

    this.PagesNames = PagesNames;

    this.linkComponents = new Map<string, NavItemLinkView>();

    this.configureView();

    this.setStateListeners();
  }

  private setStateListeners(): void {
    addStateListener('login', this.showHideAvailableLinks);
    addStateListener('logout', this.showHideAvailableLinks);
  }

  private readonly showHideAvailableLinks = (): void => {
    pagesSequence.forEach((page) => {
      const link = this.linkComponents.get(PagesUrls[page]);
      if (isAvailablePage(page)) {
        link?.show();
      } else {
        link?.hide();
      }
    });
  };

  private configureView(): void {
    if (this.logicParams === null) {
      throw new Error(`ERR: unexpected null value in logicParams!`);
    }
    const { logicParams } = this;

    const navMenuListParams = {
      tagName: TagsEnum.MARKED_LIST,
      classNames: ClassesEnum.NAV_MENU_LIST,
    };
    const navMenuList = new BasicComponent(navMenuListParams);

    const navMenuListItemParams = {
      tagName: TagsEnum.LIST_ITEM,
      classNames: ClassesEnum.NAV_MENU_LIST_ITEM,
    };
    const navMenuListItems = pagesSequence.map(() => new BasicComponent(navMenuListItemParams));

    navMenuListItems.forEach((component, index) => {
      const currentPageKey = pagesSequence[index];
      this.pageParams = {
        name: this.PagesNames[currentPageKey],
        callback: (): void => {
          console.log(`Routing request for page: ${currentPageKey}!`);
          logicParams.router.navigate(PagesUrls[currentPageKey]);
        },
      };

      const newLink = new NavItemLinkView(this.pageParams, this.linkComponents);

      component.addInnerElement(newLink);

      this.linkComponents.set(`${PagesUrls[currentPageKey]}`, newLink);

      navMenuList.addInnerElement(component);
    });

    this.basicComponent.addInnerElement(navMenuList);

    // hide authorized links
    this.showHideAvailableLinks();
  }
}
