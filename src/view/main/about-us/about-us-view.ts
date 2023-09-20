import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import View from '#src/view/view';
import HeadingH1View from '#src/view/general-components/heading-h1/heading-h1-view';

const AboutUsViewRootParams: BasicComponentConstructorArgs = {
  tagName: TagsEnum.SECTION,
  classNames: ClassesEnum.PLACEHOLDER,
};

const AboutUsViewConfig = {
  heading: 'About us',
};

type LogoArgs = Readonly<{
  href: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}>;

export default class AboutUsView extends View {
  private readonly componentConfig: typeof AboutUsViewConfig;

  private headingH1: HeadingH1View | null;

  constructor() {
    super(AboutUsViewRootParams);

    this.componentConfig = AboutUsViewConfig;

    this.headingH1 = null;

    this.configureView();

    this.createTitle();
    this.createLogoImg({
      href: 'https://rs.school/js/',
      src: 'https://rs.school/images/rs_school_js.svg',
      alt: 'Rsschool icon',
      width: 73,
      height: 26,
    });
  }

  private configureView(): void {
    this.headingH1 = new HeadingH1View('About us');

    this.basicComponent.addInnerElement(this.headingH1);
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
