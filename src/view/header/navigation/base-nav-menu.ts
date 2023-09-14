import { BasicComponent, BasicComponentConstructorArgs } from '#src/components/basic-component';
import View, { ViewLogicParams } from '#src/view/view';

import { PageParams } from '#src/types/types';

import BaseItemLinkView, { LinkComponents } from './base-nav-item-link-view';

export type NavMenuParams = Readonly<{
  names: { [index: string]: string };
  sequence: string[];
  paths: { [index: string]: string };
}>;

/**
 * Navigation menu view component.
 */
export default abstract class BaseNavMenu extends View {
  public pageParams: PageParams | null;

  public readonly linkComponents: LinkComponents;

  protected abstract get navMenuListParams(): BasicComponentConstructorArgs;

  protected abstract get navMenuListItemParams(): BasicComponentConstructorArgs;

  constructor(
    args: BasicComponentConstructorArgs,
    logicParams: ViewLogicParams,
    protected readonly navArgs: NavMenuParams
  ) {
    super(args, logicParams);

    this.pageParams = null;

    this.linkComponents = new Map<string, BaseItemLinkView>();

    this.configureView();
  }

  protected abstract createNewLink(
    pageParams: PageParams,
    linkComponents: LinkComponents
  ): BaseItemLinkView;

  protected configureView(): void {
    if (this.logicParams === null) {
      throw new Error(`ERR: unexpected null value in logicParams!`);
    }
    const { logicParams } = this;

    const navMenuList = new BasicComponent(this.navMenuListParams);

    const navMenuListItems = this.navArgs.sequence.map(
      () => new BasicComponent(this.navMenuListItemParams)
    );

    navMenuListItems.forEach((component, index) => {
      const currentItemKey = this.navArgs.sequence[index];
      this.pageParams = {
        name: this.navArgs.names[currentItemKey],
        callback: (): void => {
          console.log(`Routing request for page: ${currentItemKey}!`);
          logicParams.router.navigate(this.navArgs.paths[currentItemKey]);
        },
      };

      const newLink = this.createNewLink(this.pageParams, this.linkComponents);

      component.addInnerElement(newLink);

      this.linkComponents.set(`${this.navArgs.paths[currentItemKey]}`, newLink);

      navMenuList.addInnerElement(component);
    });

    this.basicComponent.addInnerElement(navMenuList);
  }
}
