import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import checkInstance from '#src/utils/utils';
import View from '#src/view/view';

const cssClasses = {
  header: 'header',
};

const text = 'Demo header';

const viewParams: BasicComponentConstructorArgs = {
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

/**
 * Header view component.
 */
export default class HeaderView extends View {
  constructor() {
    super(viewParams);
  }
}
