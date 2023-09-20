import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import View from '#src/view/view';
import HeadingH1View from '#src/view/general-components/heading-h1/heading-h1-view';
import PathsObj from '#src/components_params/paths-obj';
import ContributorSectionView, {
  ContributorSectionViewConfig,
} from './contributor-section/contributor-section-view';

import './about-us.css';

const ViewRootParams: BasicComponentConstructorArgs = {
  tagName: TagsEnum.SECTION,
  classNames: ClassesEnum.ABOUT_US_SECTION,
};

interface AboutUsViewConfig {
  heading: string;
  contributors: ContributorSectionViewConfig[];
  regularSubsections: 'TODO';
}

const ViewConfig: AboutUsViewConfig = {
  heading: 'About us',
  contributors: [
    {
      heading: 'Yuriy',
      img: {
        src: PathsObj.CONTRIBUTOR_PHOTO_YURIY,
        alt: 'Yuriy photo.',
      },
      subsections: [
        {
          heading: 'Quick bio',
          blocks: [
            {
              type: 'paragraph',
              content: 'Yuriy is a beginner front-end developer.',
            },
            {
              type: 'paragraph',
              content:
                "He is 28 years old. He has Bachelor's degree in Mathematical and computer modeling of mechanical systems and processes of Moscow State University of Civil Engineering (MGSU).",
            },
            {
              type: 'paragraph',
              content:
                'During his studies at the institute, he realized that information technology attracted him more than mechanics, and is currently working on becoming a qualified developer.',
            },
          ],
        },
        {
          heading: 'Contribution to the project',
          blocks: [
            {
              type: 'paragraph',
              content: 'Yuriy is a leader of the team. His contribution to the project is:',
            },
            {
              type: 'list',
              content:
                'repository setup\n' +
                'Discord server setup for team communications\n' +
                'setting up a task board on jetbrains YouTrack project management software, setup GitHub integration\n' +
                'Figma team project setup\n' +
                'npm project setup\n' +
                'builder setup\n' +
                'development scripts\n' +
                'project README\n' +
                'project basic components\n' +
                'project basic routing\n' +
                'app UI design\n' +
                'app Main page\n' +
                'app header\n' +
                'app About Us page improvements\n' +
                'make photos for references for products\n' +
                'setup deploy on Netlify with GitHub integration, deploy management',
            },
          ],
        },
        {
          heading: 'Github',
          blocks: [
            {
              type: 'gh-link',
              content: 'spacehummer; https://github.com/spacehummer',
            },
          ],
        },
      ],
    },
    {
      heading: 'David',
      img: {
        src: PathsObj.CONTRIBUTOR_PHOTO_DAVID,
        alt: 'David photo.',
      },
      subsections: [
        {
          heading: 'Quick bio',
          blocks: [
            {
              type: 'paragraph',
              content: 'Coming soon...',
            },
          ],
        },
        {
          heading: 'Contribution to the project',
          blocks: [
            {
              type: 'paragraph',
              content: 'David is a member of the team. His contribution to the project is:',
            },
            {
              type: 'list',
              content:
                'project README updates\n' +
                'app UI design\n' +
                'Commercetools project and API client setup\n' +
                'app Sign up page\n' +
                'app Log in page\n' +
                'app basic catalog page\n' +
                'app basket page\n' +
                'app basic About Us page\n' +
                'search for information for the formation of products\n' +
                'add products and categories into Commercetools with descriptions and other product parameters\n' +
                'app routing updates',
            },
          ],
        },
        {
          heading: 'Github',
          blocks: [
            {
              type: 'gh-link',
              content: 'kuzikevichdavid; https://github.com/KuzikevichDavid',
            },
          ],
        },
      ],
    },
  ],
  regularSubsections: 'TODO',
};

type LogoArgs = Readonly<{
  href: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}>;

export default class AboutUsView extends View {
  private readonly viewConfig: typeof ViewConfig;

  private headingH1: HeadingH1View | null;

  private contributorSections: ContributorSectionView[] | null;

  constructor() {
    super(ViewRootParams);

    this.viewConfig = ViewConfig;

    this.headingH1 = null;
    this.contributorSections = null;

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
    this.contributorSections = [
      new ContributorSectionView(this.viewConfig.contributors[0]),
      new ContributorSectionView(this.viewConfig.contributors[1]),
    ];

    this.basicComponent.addInnerElement(this.headingH1);
    this.contributorSections.forEach((element) => {
      this.basicComponent.addInnerElement(element);
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
