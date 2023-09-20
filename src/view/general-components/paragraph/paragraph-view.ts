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
  paragraphType?: 'type-1' | 'type-2';
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

    if (this.componentConfig) {
      if (this.componentConfig.paragraphType) {
        switch (this.componentConfig.paragraphType) {
          case 'type-1':
            this.basicComponent.addAdditionalClasses(ClassesEnum.FONT_PARAGRAPH_1);
            break;
          case 'type-2':
            this.basicComponent.addAdditionalClasses(ClassesEnum.FONT_PARAGRAPH_2);
            break;
          default:
            throw new Error(
              'ERR in ContributorSubsectionBlockView: unexpected value of `SubsectionBlockConfig.type`!'
            );
        }
      }
    } else {
      this.basicComponent.addAdditionalClasses(ClassesEnum.FONT_PARAGRAPH_2);
    }
  }
}
