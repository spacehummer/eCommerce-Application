import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import View from '#src/view/view';

const cssClasses = {
  header: 'main',
};

// const text = 'Demo main';

const viewParams: BasicComponentConstructorArgs = {
  tagName: 'main',
  classNames: [cssClasses.header],
  textContent: '',
  callback: null,
};

/**
 * Main view component.
 */
export default class MainView extends View {
  constructor() {
    super(viewParams);
  }
}
