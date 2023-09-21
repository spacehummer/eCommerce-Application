import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import View from '#src/view/view';

import './contributor-subsection.css';
import HeadingH3View from '#src/view/general-components/heading-h3/heading-h3-view';
import ContributorSubsectionBlockView, {
  SubsectionBlockConfig,
} from '#src/view/main/about-us/contributor-section/contributor-subsection/contributor-subsection-block/contributor-subsection-block-view';

const viewRootParams: BasicComponentConstructorArgs = {
  tagName: TagsEnum.CONTAINER,
  classNames: ClassesEnum.ABOUT_US_SECTION_CONTRIBUTORS_SUBSECTION,
};

export interface SubsectionConfig {
  heading: string;
  blocks: SubsectionBlockConfig[];
}

export default class ContributorSubsectionView extends View {
  private contributorSectionHeading: HeadingH3View | null;

  private contributorSubsectionBlocks: ContributorSubsectionBlockView[];

  private viewConfig: SubsectionConfig;

  constructor(config: SubsectionConfig) {
    super(viewRootParams);

    this.viewConfig = config;

    this.contributorSectionHeading = null;
    this.contributorSubsectionBlocks = [];

    this.configureView();
  }

  private configureView(): void {
    this.contributorSectionHeading = new HeadingH3View(this.viewConfig.heading);
    this.viewConfig.blocks.forEach((blockSource) => {
      this.contributorSubsectionBlocks.push(new ContributorSubsectionBlockView(blockSource));
    });

    this.basicComponent.addInnerElement(this.contributorSectionHeading);
    this.contributorSubsectionBlocks.forEach((block) => {
      this.basicComponent.addInnerElement(block);
    });
  }
}
