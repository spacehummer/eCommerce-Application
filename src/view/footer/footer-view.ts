import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import View from '#src/view/view';

const text = 'Demo footer';

const viewParams: BasicComponentConstructorArgs = {
  tagName: 'footer',
  classNames: ['footer'],
  textContent: text,
  callback: null,
};

/**
 * Header view component.
 */
export default class FooterView extends View {
  constructor() {
    super(viewParams);
  }
}
