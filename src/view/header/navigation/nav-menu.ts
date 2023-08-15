import { BasicComponent, BasicComponentConstructorArgs } from '#src/components/basic-component';
import View from '#src/view/view';

import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import TextContentEnum from '#src/components_params/text-content-enum';
import logoImgSrc from '#assets/icons/logo.svg';

const viewParams: BasicComponentConstructorArgs = {
  tagName: TagsEnum.NAV,
  classNames: ClassesEnum.NAV_MENU,
};

/**
 * General logo view component.
 */
export default class LogoGeneralView extends View {
  constructor() {
    super(viewParams);
    this.configureView();
  }

  private configureView(): void {
    const navMenuListParams = {
      tagName: TagsEnum.NUMBERED_LIST,
      classNames: ClassesEnum.GENERAL_LOGO_IMG,
    };
    const logoImg = new BasicComponent(navMenuListParams);
    logoImg.setComponentAttribute('src', logoImgSrc);

    const logoSpanParams = {
      tagName: TagsEnum.SPAN,
      classNames: ClassesEnum.GENERAL_LOGO_NAME,
      textContent: TextContentEnum.GENERAL_LOGO_NAME,
    };
    const logoSpan = new BasicComponent(logoSpanParams);

    this.basicComponent.addInnerElement(logoImg);
    this.basicComponent.addInnerElement(logoSpan);
  }
}
