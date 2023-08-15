import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import checkInstance from '#src/utils/utils';
import View from '#src/view/view';
import Content from '#src/components/basic_structure/content';
import LogoGeneralView from '#src/view/general-components/logo-general-view';
import ClassesEnum from '#src/components_params/classes-enum';

// const text = 'Demo header';

const viewParams: BasicComponentConstructorArgs = {
  tagName: 'header',
  classNames: ClassesEnum.HEADER,
  callback: (e: Event | undefined): void => {
    if (e instanceof Event) {
      checkInstance(e.currentTarget, HTMLElement).classList.toggle('demo-red');
      e.stopPropagation();
    }
  },
  eventType: 'mouseenter',
};

/**
 * Header view component.
 */
export default class HeaderView extends View {
  constructor() {
    super(viewParams);
    this.configureView();
  }

  private configureView(): void {
    const content = new Content([ClassesEnum.CONTENT_HEADER]);

    const logo = new LogoGeneralView();

    content.addInnerElement(logo);

    this.basicComponent.addInnerElement(content);
  }
}
