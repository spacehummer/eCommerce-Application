import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import View from '#src/view/view';

import './contributor-section.css';
import HeadingH2View from '../../../general-components/heading-h2/heading-h2-view';

const viewRootParams: BasicComponentConstructorArgs = {
  tagName: TagsEnum.CONTAINER,
  classNames: ClassesEnum.ABOUT_US_SECTION_CONTRIBUTORS_SECTION,
};

interface SubsectionElement {
  type: 'paragraph' | 'list' | 'gh-link';
  content: string;
}

interface Subsection {
  heading: string;
  paragraphs: SubsectionElement[];
}

export interface ContributorSectionViewConfig {
  heading: string;
  subsections: Subsection[];
}

export default class ContributorSectionView extends View {
  private contributorSectionHeading: HeadingH2View | null;

  private viewConfig: ContributorSectionViewConfig;

  constructor(config: ContributorSectionViewConfig) {
    super(viewRootParams);

    this.viewConfig = config;

    this.contributorSectionHeading = null;

    this.configureView();
  }

  private configureView(): void {
    this.contributorSectionHeading = new HeadingH2View(this.viewConfig.heading);

    this.basicComponent.addInnerElement(this.contributorSectionHeading);
  }
}
