import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import View from '#src/view/view';

import './heading-h1.css';

const HeadingH1ViewParams: BasicComponentConstructorArgs = {
  tagName: TagsEnum.H1,
  classNames: ClassesEnum.HEADING_H1,
};

interface HeadingH1Config {
  textStyle?: 'heading-type-1' | 'heading-type-2' | 'heading-type-3';
  letterSpacing?: '4%';
}

/**
 * General heading component: H1.
 */
export default class HeadingH1View extends View {
  private readonly componentConfig: HeadingH1Config | null;

  /**
   * Constructor.
   * @param {string | undefined} text - text for heading.
   *                                    If undefined, 'Placeholder' will be used as text.
   * @param config
   */
  constructor(text: string = 'Placeholder', config?: HeadingH1Config) {
    if (text) {
      Object.assign(HeadingH1ViewParams, {
        textContent: text,
      });
      console.log();
    }

    super(HeadingH1ViewParams);

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
              'ERR in HeadingH1View: unexpected value of `componentConfig.textStyle`!'
            );
        }

        if (this.componentConfig.letterSpacing === '4%') {
          this.basicComponent.addAdditionalClasses(ClassesEnum.SPARSE_004);
        }
      }
    } else {
      this.basicComponent.addAdditionalClasses(ClassesEnum.FONT_HEADING_TYPE_1);
    }
  }
}
