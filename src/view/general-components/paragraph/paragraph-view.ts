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
  textStyle?: 'paragraph-type-1' | 'paragraph-type-2';
}

/**
 * General paragraph component.
 */
export default class ParagraphView extends View {
  private readonly componentConfig: ParagraphConfig | null;

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

    super(ParagraphViewParams);

    this.componentConfig = config || null;

    // TODO: encapsulate in separate method with name `configureView`.
    if (this.componentConfig) {
      if (this.componentConfig.textStyle) {
        switch (this.componentConfig.textStyle) {
          case 'paragraph-type-1':
            this.basicComponent.addAdditionalClasses(ClassesEnum.FONT_PARAGRAPH_1);
            break;
          case 'paragraph-type-2':
            this.basicComponent.addAdditionalClasses(ClassesEnum.FONT_PARAGRAPH_2);
            break;
          default:
            throw new Error(
              'ERR in ParagraphView: unexpected value of `componentConfig.textStyle`!'
            );
        }
      }
    } else {
      this.basicComponent.addAdditionalClasses(ClassesEnum.FONT_PARAGRAPH_2);
    }
  }
}
