import ClassesEnum from '#src/components_params/classes-enum';
import { BasicComponent } from '../basic-component';

const sectionParams = {
  tagName: 'section',
  classNames: ClassesEnum.SECTION,
  id: '',
  textContent: null,
  callback: null,
};

/**
 * Root container for all App components.
 */
export default class Content extends BasicComponent {
  constructor(additionClassesList: ClassesEnum | ClassesEnum[], id: string) {
    sectionParams.id = id;
    super(sectionParams);

    if (additionClassesList) {
      this.addAdditionalClasses(additionClassesList);
    }
  }
}
