import View from '#src/view/view';
import TagsEnum from '#src/components_params/tags-enum';
import ClassesEnum from '#src/components_params/classes-enum';
import { PageParams } from '#src/types/types';
import checkInstance from '#src/utils/utils';

export type LinkComponents = Map<string, BaseItemLinkView>;

export default class BaseItemLinkView extends View {
  protected readonly pageParam: PageParams;

  protected readonly linkComponents: LinkComponents;

  constructor(
    classNames: ClassesEnum,
    protected readonly currState: ClassesEnum,
    pageParams: PageParams,
    linkComponents: LinkComponents
  ) {
    super({ classNames, tagName: TagsEnum.LINK });

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

    checkInstance(this.basicComponent.getHTMLElement(), HTMLElement).classList.add(this.currState);
  }

  /**
   * Unset current page status for navigation link component.
   * @private
   */
  private setNotCurrentStatus(): void {
    checkInstance(this.basicComponent.getHTMLElement(), HTMLElement).classList.remove(
      this.currState
    );
  }

  private configureView(): void {
    this.basicComponent.setTextContent(this.pageParam.name);
    this.basicComponent.setCallback(this.pageParam.callback, 'click');
    /* weak thing: do we need a state manager? */
    this.basicComponent.setCallback(this.setCurrentStatus.bind(this), 'click');
  }
}
