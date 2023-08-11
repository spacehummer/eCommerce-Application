import { BasicComponent } from '../basic-component';

const rootContainerParams = {
  tagName: 'div',
  classNames: ['root-container'],
  textContent: null,
  callback: null,
};

/**
 * Root container for all App components.
 */
export default class RootContainer extends BasicComponent {
  constructor() {
    super(rootContainerParams);
  }
}
