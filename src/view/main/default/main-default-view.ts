import { BasicComponent, BasicComponentConstructorArgs } from '#src/components/basic-component';
import View from '#src/view/view';

import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import TextContentEnum from '#src/components_params/text-content-enum';

const viewParams: BasicComponentConstructorArgs = {
  tagName: TagsEnum.SECTION,
  classNames: ClassesEnum.MAIN_WELCOME_SECTION,
};

/**
 * Main default view component.
 */
export default class MainDefaultView extends View {
  constructor() {
    super(viewParams);
    this.configureView();
  }

  private configureView(): void {
    const welcomeHeadingParams: BasicComponentConstructorArgs = {
      tagName: TagsEnum.H2,
      classNames: ClassesEnum.MAIN_WELCOME_SECTION_HEADING,
      textContent: TextContentEnum.MAIN_WELCOME_SECTION_HEADING,
    };
    const welcomeHeading = new BasicComponent(welcomeHeadingParams);

    const welcomeTextBlockParams: BasicComponentConstructorArgs = {
      tagName: TagsEnum.CONTAINER,
      classNames: ClassesEnum.MAIN_WELCOME_SECTION_TEXT_BLOCK,
    };
    const welcomeTextBlock = new BasicComponent(welcomeTextBlockParams);

    const welcomeParagraphParams: BasicComponentConstructorArgs = {
      tagName: TagsEnum.PARAGRAPH,
      classNames: ClassesEnum.MAIN_WELCOME_SECTION_PARAGRAPH,
    };
    const welcomeParagraphsArr = [
      new BasicComponent({
        ...welcomeParagraphParams,
        ...{ textContent: TextContentEnum.MAIN_WELCOME_SECTION_TB1_P1 },
      }),
      new BasicComponent({
        ...welcomeParagraphParams,
        ...{ textContent: TextContentEnum.MAIN_WELCOME_SECTION_TB1_P2 },
      }),
      new BasicComponent({
        ...welcomeParagraphParams,
        ...{ textContent: TextContentEnum.MAIN_WELCOME_SECTION_TB1_P3 },
      }),
    ];
    welcomeParagraphsArr.forEach((paragraph) => {
      welcomeTextBlock.addInnerElement(paragraph);
    });

    this.basicComponent.addInnerElement(welcomeHeading);
    this.basicComponent.addInnerElement(welcomeTextBlock);
  }
}
