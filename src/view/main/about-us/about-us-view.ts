import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import View from '#src/view/view';

const args: BasicComponentConstructorArgs = {
  tagName: TagsEnum.SECTION,
  classNames: ClassesEnum.ONLY_FOR_DRAFT_CODE,
};

type LogoArgs = Readonly<{
  href: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}>;

export default class AboutUsView extends View {
  constructor() {
    super(args);

    this.createTitle();
    this.createLogoImg({
      href: 'https://rs.school/js/',
      src: 'https://rs.school/images/rs_school_js.svg',
      alt: 'Rsschool icon',
      width: 73,
      height: 26,
    });
  }

  private createTitle(): void {
    const title = document.createElement(TagsEnum.H2);
    title.textContent = 'About us';

    this.basicComponent.addInnerElement(title);
  }

  private createLogoImg({ href, src, alt, width, height }: LogoArgs): void {
    const logoLink = document.createElement(TagsEnum.LINK);
    logoLink.href = href;
    const logoImage = document.createElement(TagsEnum.IMG);
    logoImage.src = src;
    logoImage.alt = alt;
    logoImage.width = width;
    logoImage.height = height;

    logoLink.append(logoImage);

    this.basicComponent.addInnerElement(logoLink);
  }
}
