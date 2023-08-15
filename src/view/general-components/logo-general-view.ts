import { BasicComponent, BasicComponentConstructorArgs } from '#src/components/basic-component';
import View from '#src/view/view';

import ClassesEnum from '#src/components_params/classes-enum';
import logoImgSrc from '../../../assets/icons/logo.svg';
// import logoImgSrc2 from '../../../assets/icons/logo.png';

const viewParams: BasicComponentConstructorArgs = {
  tagName: 'div',
  classNames: ClassesEnum.GENERAL_LOGO,
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
    const logoImgParams = {
      tagName: 'img',
      classNames: ClassesEnum.GENERAL_LOGO_IMG,
    };
    const logoImg = new BasicComponent(logoImgParams);
    logoImg.setComponentAttribute('src', logoImgSrc);

    const logoSpanParams = {
      tagName: 'span',
      classNames: ClassesEnum.GENERAL_LOGO_NAME,
      textContent: 'BookSavior',
    };
    const logoSpan = new BasicComponent(logoSpanParams);

    this.basicComponent.addInnerElement(logoImg);
    this.basicComponent.addInnerElement(logoSpan);
  }
}
