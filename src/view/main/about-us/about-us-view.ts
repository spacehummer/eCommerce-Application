import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import View from '#src/view/view';

const args: BasicComponentConstructorArgs = {
  tagName: TagsEnum.SECTION,
  classNames: ClassesEnum.ONLY_FOR_DRAFT_CODE,
};

export default class AboutUsView extends View {
  constructor() {
    super(args);

    this.createTitle();
    this.createLogoImg();
  }

  private createTitle(): void {
    const title = document.createElement(TagsEnum.H2);
    title.textContent = 'About us';

    this.basicComponent.addInnerElement(title);
  }

  private createLogoImg() {
    //   logoArgs: {
    //   href: string;
    //   src: string;
    //   alt: string;
    //   width: number;
    //   height: number;
    // }
    const logoLink = document.createElement(TagsEnum.LINK);
    logoLink.href = 'https://rs.school/js/'
    const logoImage = document.createElement(TagsEnum.IMG);
    logoImage.src = 'https://rs.school/images/rs_school_js.svg'
    logoImage.alt = 'Rsschool icon'
    logoImage.width = 73;
    logoImage.height = 26;

    logoLink.append(logoImage)

    this.basicComponent.addInnerElement(logoLink);
  }
}
