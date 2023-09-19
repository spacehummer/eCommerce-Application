import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import View from '#src/view/view';

import './heading-h1.css';

const HeadingH1ViewParams: BasicComponentConstructorArgs = {
  tagName: TagsEnum.H1,
  classNames: ClassesEnum.HEADING_H1,
};

/**
 * General heading component: H1.
 */
export default class HeadingH1View extends View {
  /**
   * Constructor.
   * @param {string | undefined} text - text for heading.
   *                                    If undefined, 'Placeholder' will be used as text.
   */
  constructor(text: string = 'Placeholder') {
    if (text) {
      Object.assign(HeadingH1ViewParams, {
        textContent: text,
      });
      console.log();
    }

    super(HeadingH1ViewParams);
  }
}
