import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import View from '#src/view/view';

import './heading-h1.css';

const HeadingH2ViewParams: BasicComponentConstructorArgs = {
  tagName: TagsEnum.H2,
  classNames: ClassesEnum.HEADING_H2,
};

interface HeadingH2Config {
  letterSpacing?: '4%';
}

/**
 * General heading component: H2.
 */
export default class HeadingH2View extends View {
  /**
   * Constructor.
   * @param {string | undefined} text - text for heading.
   *                                    If undefined, 'Placeholder' will be used as text.
   * @param {HeadingH2Config | undefined} config  - config for setup additional component parameters.
   */
  constructor(text: string = 'Placeholder', config?: HeadingH2Config) {
    if (text) {
      Object.assign(HeadingH2ViewParams, {
        textContent: text,
      });
    }
    if (config?.letterSpacing === '4%') {
      Object.assign(HeadingH2ViewParams, {
        classNames: [...HeadingH2ViewParams.classNames, ClassesEnum.SPARSE_004],
      });
    }

    super(HeadingH2ViewParams);
  }
}
