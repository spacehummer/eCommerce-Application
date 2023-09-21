import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import View from '#src/view/view';
import HeadingH1View from '#src/view/general-components/heading-h1/heading-h1-view';
import PathsObj from '#src/components_params/paths-obj';

import { SubsectionBlockConfig } from '#src/view/main/about-us/contributor-section/contributor-subsection/contributor-subsection-block/contributor-subsection-block-view';
import RegularSubsectionView from '#src/view/main/about-us/regular-subsection/regular-subsection-view';

import ContributorSectionView, {
  ContributorSectionViewConfig,
} from './contributor-section/contributor-section-view';

const ViewRootParams: BasicComponentConstructorArgs = {
  tagName: TagsEnum.SECTION,
  classNames: ClassesEnum.ABOUT_US_SECTION,
};

interface RegularSubsectionConfig {
  heading: string;
  blocks: SubsectionBlockConfig[];
}

interface AboutUsViewConfig {
  heading: string;
  contributors: ContributorSectionViewConfig[];
  regularSubsections: RegularSubsectionConfig[];
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
              content:
                'David is thirty years old. He has a bachelor degree software engineer 2015 Yanka Kupala State University of Grodno, faculty of Mathematics and Informatics. Theme of degree work: “Develop a real time strategy game (RTS). Development of user interface and the network part of the game”. Nowadays he work in the IT department at the largest state-owned enterprise of the chemical industry “Grodno Azot” for last eight years. Briefly, his responsibility is to write new and maintain old queries to the database, manipulate with database objects. His strengths are stress resistance, sometimes need to do hot fix in production.',
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
  regularSubsections: [
    {
      heading: 'Team development retrospective',
      blocks: [
        {
          type: 'paragraph',
          content:
            'The efficiency of interaction was maintained through the use of project management software. Thanks to integration with GitHub, it was clear which commit, which branch related to which task.',
        },
        {
          type: 'paragraph',
          content:
            'Communications were conducted on a Discord server created and configured with channels for the main types of team interactions.',
        },
        {
          type: 'paragraph',
          content:
            'For automation and convenience for deployment, the Netlify service was used with integration with GitHub and preview deployments, which made it possible to quickly see the current result and identify errors.',
        },
      ],
    },
  ],
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

  private regularSubsections: RegularSubsectionView[] | null;

  constructor() {
    super(ViewRootParams);

    this.viewConfig = ViewConfig;

    this.headingH1 = null;
    this.contributorSections = null;
    this.regularSubsections = null;

    this.configureView();

    this.createLogoImg({
      href: 'https://rs.school/js/',
      src: 'https://rs.school/images/rs_school_js.svg',
      alt: 'RS School icon',
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
    this.regularSubsections = [new RegularSubsectionView(this.viewConfig.regularSubsections[0])];

    this.basicComponent.addInnerElement(this.headingH1);
    this.contributorSections.forEach((component) => {
      this.basicComponent.addInnerElement(component);
    });
    this.regularSubsections.forEach((component) => {
      this.basicComponent.addInnerElement(component);
    });
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
