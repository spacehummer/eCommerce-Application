import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import View from '#src/view/view';

// import './contributor-section.css';
import HeadingH3View from '#src/view/general-components/heading-h3/heading-h3-view';

const viewRootParams: BasicComponentConstructorArgs = {
  tagName: TagsEnum.CONTAINER,
  classNames: ClassesEnum.PLACEHOLDER,
};

interface SubsectionElement {
  type: 'paragraph' | 'list' | 'gh-link';
  content: string;
}

export interface Subsection {
  heading: string;
  paragraphs: SubsectionElement[];
}

export default class ContributorSubsectionView extends View {
  private contributorSectionHeading: HeadingH3View | null;

  private contributorSubsection: null;

  private viewConfig: Subsection;

  constructor(config: Subsection) {
    super(viewRootParams);

    this.viewConfig = config;

    this.contributorSectionHeading = null;
    this.contributorSubsection = null;

    this.configureView();
  }

  private configureView(): void {
    this.contributorSectionHeading = new HeadingH3View(this.viewConfig.heading);

    this.basicComponent.addInnerElement(this.contributorSectionHeading);
  }
}
