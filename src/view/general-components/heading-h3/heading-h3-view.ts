import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import View from '#src/view/view';

import './heading-h3.css';

const HeadingH3ViewParams: BasicComponentConstructorArgs = {
  tagName: TagsEnum.H3,
  classNames: ClassesEnum.HEADING_H3,
};

interface HeadingH3Config {
  textStyle?: 'heading-type-1' | 'heading-type-2' | 'heading-type-3';
}

/**
 * General heading component: H3.
 */
export default class HeadingH3View extends View {
  private readonly componentConfig: HeadingH3Config | null;

  /**
   * Constructor.
   * @param {string | undefined} text - text for heading.
   *                                    If undefined, 'Placeholder' will be used as text.
   * @param config
   */
  constructor(text: string = 'Placeholder', config?: HeadingH3Config) {
    if (text) {
      Object.assign(HeadingH3ViewParams, {
        textContent: text,
      });
    }

    super(HeadingH3ViewParams);

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
              'ERR in HeadingH3View: unexpected value of `componentConfig.textStyle`!'
            );
        }
      }
    } else {
      this.basicComponent.addAdditionalClasses(ClassesEnum.FONT_HEADING_TYPE_3);
    }
  }
}
