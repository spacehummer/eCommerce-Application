import { BasicComponent, BasicComponentConstructorArgs } from '#src/components/basic-component';
import View from '#src/view/view';

import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
// import TextContentEnum from '#src/components_params/text-content-enum';
import NavItemLinkView, { LinkComponents } from '#src/view/header/navigation/nav-item-link-view';
import { PageParams } from '#src/types/types';
// import { PagesPathsEnum } from '#src/components_params/pages-paths';

/**
 * Names of pages available via navigation menu.
 */
const PagesNames: { [index: string]: string } = {
  INDEX: 'Main',
  LOGIN: 'Sign up',
  SIGN_UP: 'Sign in',
};

const pagesSequence: string[] = ['INDEX', 'LOGIN', 'SIGN_UP'];

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

  private readonly linkComponents: LinkComponents;

  constructor() {
    super(viewParams);

    this.pageParams = null;

    this.PagesNames = PagesNames;

    this.linkComponents = new Map<string, NavItemLinkView>();

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
    const navMenuListItems = pagesSequence.map(() => new BasicComponent(navMenuListItemParams));

    navMenuListItems.forEach((component, index) => {
      const currentPageKey = pagesSequence[index];
      // console.log(this.PagesNames[currentPageKey]);
      this.pageParams = {
        name: this.PagesNames[currentPageKey],
        callback: (): void => {
          console.log('Routing request!');
        },
      };

      const newLink = new NavItemLinkView(this.pageParams, this.linkComponents);

      component.addInnerElement(newLink);

      this.linkComponents.set(`link-${index}`, newLink);
      // this.linkComponents = new Map<string, NavItemLinkView>([['Some String', newLink]]);
      console.log(this.linkComponents);
    });

    navMenuList.addInnerElement(navMenuListItems[0]);
    navMenuList.addInnerElement(navMenuListItems[1]);
    navMenuList.addInnerElement(navMenuListItems[2]);
    this.basicComponent.addInnerElement(navMenuList);
  }
}
