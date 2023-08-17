import View from '#src/view/view';
import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import TagsEnum from '#src/components_params/tags-enum';
import ClassesEnum from '#src/components_params/classes-enum';
import { PageParams } from '#src/types/types';
import checkInstance from '#src/utils/utils';

/**
 * Type for Map with NavItemLinkView instances.
 */
export type LinkElements = Map<string, NavItemLinkView>;

const viewParams: BasicComponentConstructorArgs = {
  tagName: TagsEnum.LINK,
  classNames: ClassesEnum.NAV_MENU_LIST_ITEM_LINK,
};

export default class NavItemLinkView extends View {
  private pageParam: PageParams;

  private linkElements: LinkElements;

  constructor(pageParams: PageParams, linkElements: LinkElements) {
    super(viewParams);

    this.pageParam = pageParams;
    this.linkElements = linkElements;

    this.configureView();
  }

  private setCurrentStatus(): void {
    checkInstance(this.basicComponent.getHTMLElement(), HTMLElement).classList.add(
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
