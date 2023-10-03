import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import View from '#src/view/view';

import './heading-h2.css';

const HeadingH2ViewParams: BasicComponentConstructorArgs = {
  tagName: TagsEnum.H2,
  classNames: ClassesEnum.HEADING_H2,
};

interface HeadingH2Config {
  textStyle?: 'heading-type-1' | 'heading-type-2' | 'heading-type-3';
  letterSpacing?: '4%';
}

/**
 * General heading component: H2.
 */
export default class HeadingH2View extends View {
  private readonly componentConfig: HeadingH2Config | null;

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

    super(HeadingH2ViewParams);

    this.componentConfig = config || null;

    if (this.componentConfig) {
      if (this.componentConfig.textStyle) {
        switch (this.componentConfig.textStyle) {
          case 'heading-type-1':
            this.basicComponent.addAdditionalClasses(ClassesEnum.FONT_HEADING_TYPE_1);
            break;
          case 'heading-type-2':
            this.basicComponent.addAdditionalClasses(ClassesEnum.FONT_HEADING_TYPE_2);
            break;
          case 'heading-type-3':
            this.basicComponent.addAdditionalClasses(ClassesEnum.FONT_HEADING_TYPE_3);
            break;
          default:
            throw new Error(
              'ERR in HeadingH2View: unexpected value of `componentConfig.textStyle`!'
            );
        }

        if (this.componentConfig.letterSpacing === '4%') {
          this.basicComponent.addAdditionalClasses(ClassesEnum.SPARSE_004);
        }
      }
    } else {
      this.basicComponent.addAdditionalClasses(ClassesEnum.FONT_HEADING_TYPE_2);
    }

    if (config?.letterSpacing === '4%') {
      this.basicComponent.addAdditionalClasses(ClassesEnum.SPARSE_004);
    }
  }
}
