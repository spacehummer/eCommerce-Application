import { BasicComponent, BasicComponentConstructorArgs } from '#src/components/basic-component';
import View from '#src/view/view';

import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import TextContentEnum from '#src/components_params/text-content-enum';

import AttributesNamesEnum from '../../components_params/attributes-names-enum';
import AttributesValuesEnum from '../../components_params/attributes-values-enum';

const viewParams: BasicComponentConstructorArgs = {
  tagName: TagsEnum.CONTAINER,
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
      tagName: TagsEnum.IMG,
      classNames: ClassesEnum.GENERAL_LOGO_IMG,
    };
    const logoImg = new BasicComponent(logoImgParams);
    logoImg.setComponentAttribute(AttributesNamesEnum.SRC, AttributesValuesEnum.SRC_LOGO_IMG);

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
