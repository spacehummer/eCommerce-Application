import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import View from '#src/view/view';

import './contributor-section.css';
import ContributorSubsectionView, {
  Subsection,
} from '#src/view/main/about-us/contributor-block/contributor-subsection/contributor-subsection-view';
import HeadingH2View from '../../../general-components/heading-h2/heading-h2-view';

const viewRootParams: BasicComponentConstructorArgs = {
  tagName: TagsEnum.CONTAINER,
  classNames: ClassesEnum.ABOUT_US_SECTION_CONTRIBUTORS_SECTION,
};

export interface ContributorSectionViewConfig {
  heading: string;
  subsections: Subsection[];
}

export default class ContributorSectionView extends View {
  private contributorSectionHeading: HeadingH2View | null;

  private contributorSubsection: ContributorSubsectionView | null;

  private viewConfig: ContributorSectionViewConfig;

  constructor(config: ContributorSectionViewConfig) {
    super(viewRootParams);

    this.viewConfig = config;

    this.contributorSectionHeading = null;
    this.contributorSubsection = null;

    this.configureView();
  }

  private configureView(): void {
    this.contributorSectionHeading = new HeadingH2View(this.viewConfig.heading);
    this.contributorSubsection = new ContributorSubsectionView(this.viewConfig.subsections[0]);

    this.basicComponent.addInnerElement(this.contributorSectionHeading);
    this.basicComponent.addInnerElement(this.contributorSubsection);
  }
}
