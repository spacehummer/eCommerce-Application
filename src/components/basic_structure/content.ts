import TagsEnum from '#src/components_params/tags-enum';
import ClassesEnum from '#src/components_params/classes-enum';
import { BasicComponent, BasicComponentConstructorArgs } from '../basic-component';

const rootContainerParams: BasicComponentConstructorArgs = {
  tagName: TagsEnum.CONTAINER,
  classNames: ClassesEnum.CONTENT,
  textContent: null,
  callback: null,
};

/**
 * Root container for all App components.
 */
export default class Content extends BasicComponent {
  /**
   * Uses rootContainerParams amd can add new classes throw arg additionClassesList
   * @param { ClassesEnum | ClassesEnum[]} additionClassesList  - additional classes
   *  for content block, e.g. 'content--header' modifier for header content.
   */
  constructor(additionClassesList?: ClassesEnum | ClassesEnum[]) {
    super(rootContainerParams);

    if (additionClassesList) {
      this.addAdditionalClasses(additionClassesList);
    }
  }
}
