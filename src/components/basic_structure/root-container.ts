import { BasicComponent } from '../basic-component';

const rootContainerParams = {
  tagName: 'div',
  classNames: ['root-container'],
  textContent: null,
  callback: null,
};

export default class RootContainer extends BasicComponent {
  constructor() {
    super(rootContainerParams);
  }
}
