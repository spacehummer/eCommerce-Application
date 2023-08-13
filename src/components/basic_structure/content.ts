import { BasicComponent, ClassList } from '../basic-component';

const rootContainerParams = {
  tagName: 'div',
  classNames: ['content'],
  textContent: null,
  callback: null,
};

/**
 * Root container for all App components.
 */
export default class Content extends BasicComponent {
  constructor(additionClassesList?: ClassList) {
    if (additionClassesList) {
      rootContainerParams.classNames.push(...additionClassesList);
    }
    super(rootContainerParams);
  }
}
