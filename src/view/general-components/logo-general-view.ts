import { BasicComponent, BasicComponentConstructorArgs } from '#src/components/basic-component';
import View from '#src/view/view';

import logoImgSrc from '../../../assets/icons/logo.svg';
// import logoImgSrc2 from '../../../assets/icons/logo.png';

const viewParams: BasicComponentConstructorArgs = {
  tagName: 'div',
  classNames: ['logo'],
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
      classNames: ['logo__img'],
    };
    const logoImg = new BasicComponent(logoImgParams);
    logoImg.setComponentAttribute('src', logoImgSrc);

    const logoSpanParams = {
      tagName: 'span',
      classNames: ['logo__name'],
      textContent: 'BookSavior',
    };
    const logoSpan = new BasicComponent(logoSpanParams);

    this.basicComponent.addInnerElement(logoImg);
    this.basicComponent.addInnerElement(logoSpan);
  }
}
