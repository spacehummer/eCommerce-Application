import { BasicComponent, BasicComponentConstructorArgs } from '#src/components/basic-component';
import View from '#src/view/view';

import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import TextContentEnum from '#src/components_params/text-content-enum';

const viewParams: BasicComponentConstructorArgs = {
  tagName: TagsEnum.SECTION,
  classNames: ClassesEnum.SECTION_404,
};

/**
 * Main default view component.
 */
export default class Section404View extends View {
  constructor() {
    super(viewParams);
    this.configureView();
  }

  private configureView(): void {
    const section404HeadingParams: BasicComponentConstructorArgs = {
      tagName: TagsEnum.H2,
      classNames: ClassesEnum.SECTION_404_HEADING,
      textContent: TextContentEnum.SECTION_ERROR_404_HEADING,
    };
    const section404Heading = new BasicComponent(section404HeadingParams);

    const section404TextBlockParams: BasicComponentConstructorArgs = {
      tagName: TagsEnum.CONTAINER,
      classNames: ClassesEnum.SECTION_404_TEXT_BLOCK,
    };
    const section404TextBlock = new BasicComponent(section404TextBlockParams);

    const section404ParagraphParams: BasicComponentConstructorArgs = {
      tagName: TagsEnum.PARAGRAPH,
      classNames: ClassesEnum.SECTION_404_PARAGRAPH,
    };
    const section404ParagraphsArr = [
      new BasicComponent({
        ...section404ParagraphParams,
        ...{ textContent: TextContentEnum.SECTION_ERROR_404_TB1_P1 },
      }),
      new BasicComponent({
        ...section404ParagraphParams,
        ...{ textContent: TextContentEnum.SECTION_ERROR_404_TB1_P2 },
      }),
    ];
    section404ParagraphsArr.forEach((paragraph) => {
      section404TextBlock.addInnerElement(paragraph);
    });

    this.basicComponent.addInnerElement(section404Heading);
    this.basicComponent.addInnerElement(section404TextBlock);
  }
}
