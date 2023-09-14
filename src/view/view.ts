import { BasicComponent, BasicComponentConstructorArgs } from '#src/components/basic-component';
import { Router } from '#src/logic/router/route-types';
import { GetHTMLElement } from '#src/types/types';

export interface ViewLogicParams {
  router: Router;
}

export default class View implements GetHTMLElement {
  public basicComponent: BasicComponent;

  public logicParams: ViewLogicParams | null;

  constructor(viewParams: BasicComponentConstructorArgs, logicParams?: ViewLogicParams) {
    this.basicComponent = this.createView(viewParams);

    this.logicParams = logicParams || null;
  }

  /**
   * @return {HTMLElement | null}
   */
  public getHTMLElement(): HTMLElement | null {
    return this.basicComponent.getHTMLElement();
  }

  /**
   * Create view component.
   * @private
   * @return {BasicComponent} - component, creating by BasicComponent.
   */
  private createView(viewParams: BasicComponentConstructorArgs): BasicComponent {
    return new BasicComponent(viewParams);
  }
}
