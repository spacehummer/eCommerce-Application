import ClassesEnum from '#src/components_params/classes-enum';
import { BasicComponent } from '../basic-component';

const rootContainerParams = {
  tagName: 'div',
  classNames: ClassesEnum.ROOT_CONTAINER,
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
