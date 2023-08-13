import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import View from '#src/view/view';
import Content from '#src/components/basic_structure/content';

// const text = 'Demo footer';

const viewParams: BasicComponentConstructorArgs = {
  tagName: 'footer',
  classNames: ['footer'],
  callback: null,
};

/**
 * Footer view component.
 */
export default class FooterView extends View {
  constructor() {
    super(viewParams);
    this.configureView();
  }

  private configureView(): void {
    const content = new Content();

    this.basicComponent.addInnerElement(content);
  }
}
