import { BasicComponent, BasicComponentConstructorArgs } from '#src/components/basic-component';
import { GetHTMLElement } from '#src/types/types';

export default class View implements GetHTMLElement {
  public basicComponent: BasicComponent;

  constructor(viewParams: BasicComponentConstructorArgs) {
    this.basicComponent = this.createView(viewParams);
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
