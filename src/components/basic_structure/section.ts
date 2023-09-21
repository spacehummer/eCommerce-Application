import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import { BasicComponent } from '../basic-component';

const sectionParams = {
  tagName: TagsEnum.SECTION,
  classNames: ClassesEnum.SECTION,
  id: '',
  textContent: null,
  callback: null,
};

/**
 * Root container for all App components.
 */
export default class Section extends BasicComponent {
  constructor(additionClassesList: ClassesEnum | ClassesEnum[], id: string) {
    sectionParams.id = id;
    super(sectionParams);

    if (additionClassesList) {
      this.addAdditionalClasses(additionClassesList);
    }
  }
}
