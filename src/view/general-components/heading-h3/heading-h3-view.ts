import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import View from '#src/view/view';

import './heading-h3.css';

const HeadingH3ViewParams: BasicComponentConstructorArgs = {
  tagName: TagsEnum.H3,
  classNames: ClassesEnum.HEADING_H3,
};

/**
 * General heading component: H3.
 */
export default class HeadingH3View extends View {
  /**
   * Constructor.
   * @param {string | undefined} text - text for heading.
   *                                    If undefined, 'Placeholder' will be used as text.
   */
  constructor(text: string = 'Placeholder') {
    if (text) {
      Object.assign(HeadingH3ViewParams, {
        textContent: text,
      });
    }

    super(HeadingH3ViewParams);
  }
}
