import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import View from '#src/view/view';

import './paragraph.css';

const ParagraphViewParams: BasicComponentConstructorArgs = {
  tagName: TagsEnum.PARAGRAPH,
  classNames: ClassesEnum.PARAGRAPH,
};

interface ParagraphConfig {
  fontWeight?: 'medium-500';
}

/**
 * General paragraph component.
 */
export default class ParagraphView extends View {
  /**
   * Constructor.
   * @param {string | undefined} text - text for paragraph.
   *                                    If undefined, 'Placeholder' will be used as text.
   * @param {ParagraphConfig | undefined} config  - config for setup additional component parameters.
   */
  constructor(text: string = 'Placeholder', config?: ParagraphConfig) {
    if (text) {
      Object.assign(ParagraphViewParams, {
        textContent: text,
      });
    }
    if (config?.fontWeight === 'medium-500') {
      Object.assign(ParagraphViewParams, {
        classNames: [...ParagraphViewParams.classNames, ClassesEnum.FONT_WEIGHT_500],
      });
    }

    super(ParagraphViewParams);
  }
}
