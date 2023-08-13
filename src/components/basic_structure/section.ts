import { BasicComponent, ClassList } from '../basic-component';

const rootContainerParams = {
  tagName: 'section',
  classNames: [''],
  id: '',
  textContent: null,
  callback: null,
};

/**
 * Root container for all App components.
 */
export default class Content extends BasicComponent {
  constructor(additionClassesList: ClassList, id: string) {
    rootContainerParams.classNames = additionClassesList;
    rootContainerParams.id = id;
    super(rootContainerParams);
  }
}
