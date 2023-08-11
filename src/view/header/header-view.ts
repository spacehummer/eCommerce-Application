import { BasicComponent, BasicComponentConstructorArgs } from '#src/components/basic-component';
import checkInstance from '#src/utils/utils';

const cssClasses = {
  header: 'header',
};

const text = 'Demo header';

export default class HeaderView {
  public basicComponent: BasicComponent;

  constructor() {
    this.basicComponent = this.createView();
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
  private createView(): BasicComponent {
    const componentParams: BasicComponentConstructorArgs = {
      tagName: 'header',
      classNames: [cssClasses.header],
      textContent: text,
      callback: (e: Event | undefined): void => {
        if (e instanceof Event) {
          checkInstance(e.target, HTMLElement).classList.toggle('demo-red');
        }
      },
      eventType: 'mouseover',
    };
    return new BasicComponent(componentParams);
  }
}
