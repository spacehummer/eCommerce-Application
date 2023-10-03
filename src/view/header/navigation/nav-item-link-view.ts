import View from '#src/view/view';
import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import TagsEnum from '#src/components_params/tags-enum';
import ClassesEnum from '#src/components_params/classes-enum';
import { PageParams } from '#src/types/types';
import checkInstance from '#src/utils/utils';

/**
 * Type for Map with NavItemLinkView instances.
 */
export type LinkComponents = Map<string, NavItemLinkView>;

const viewParams: BasicComponentConstructorArgs = {
  tagName: TagsEnum.LINK,
  classNames: ClassesEnum.NAV_MENU_LIST_ITEM_LINK,
};

export default class NavItemLinkView extends View {
  private pageParam: PageParams;

  private linkComponents: LinkComponents;

  constructor(pageParams: PageParams, linkComponents: LinkComponents) {
    super(viewParams);

    this.pageParam = pageParams;
    this.linkComponents = linkComponents;

    this.configureView();
  }

  /**
   * Set current page status for navigation link component.
   * @private
   */
  public setCurrentStatus(): void {
    this.linkComponents.forEach((linkComponent) => {
      linkComponent.setNotCurrentStatus();
    });

    checkInstance(this.basicComponent.getHTMLElement(), HTMLElement).classList.add(
      ClassesEnum.ITEM_CURRENT
    );
  }

  /**
   * Unset current page status for navigation link component.
   * @private
   */
  private setNotCurrentStatus(): void {
    checkInstance(this.basicComponent.getHTMLElement(), HTMLElement).classList.remove(
      ClassesEnum.ITEM_CURRENT
    );
  }

  private configureView(pageParam?: PageParams): void {
    if (pageParam) {
      this.pageParam = pageParam;
    }

    this.basicComponent.setTextContent(this.pageParam.name);
    this.basicComponent.setCallback(this.pageParam.callback, 'click');
    /* weak thing: do we need a state manager? */
    this.basicComponent.setCallback(this.setCurrentStatus.bind(this), 'click');
  }
}
