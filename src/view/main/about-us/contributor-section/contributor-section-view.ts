import { BasicComponent, BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import View from '#src/view/view';

import './contributor-section.css';
import ContributorSubsectionView, {
  SubsectionConfig,
} from '#src/view/main/about-us/contributor-section/contributor-subsection/contributor-subsection-view';
import ContributorPhoto, {
  ContributorPhotoConfig,
} from '#src/view/main/about-us/contributor-section/contributor-photo/contributor-photo';
import HeadingH2View from '../../../general-components/heading-h2/heading-h2-view';

const viewRootParams: BasicComponentConstructorArgs = {
  tagName: TagsEnum.CONTAINER,
  classNames: ClassesEnum.ABOUT_US_SECTION_CONTRIBUTORS_SECTION,
};

export interface ContributorSectionViewConfig {
  heading: string;
  img: ContributorPhotoConfig;
  subsections: SubsectionConfig[];
}

export default class ContributorSectionView extends View {
  private contributorPhoto: ContributorPhoto | null;

  private contributorRightSideContainer: BasicComponent | null;

  private contributorSectionHeading: HeadingH2View | null;

  private contributorSubsections: ContributorSubsectionView[] | null;

  private viewConfig: ContributorSectionViewConfig;

  constructor(config: ContributorSectionViewConfig) {
    super(viewRootParams);

    this.viewConfig = config;

    this.contributorPhoto = null;
    this.contributorRightSideContainer = null;
    this.contributorSectionHeading = null;
    this.contributorSubsections = null;

    this.configureView();
  }

  private configureView(): void {
    this.contributorPhoto = new ContributorPhoto(this.viewConfig.img);

    const contributorRightSideContainerParams: BasicComponentConstructorArgs = {
      tagName: TagsEnum.CONTAINER,
      classNames: ClassesEnum.ABOUT_US_SECTION_CONTRIBUTORS_SECTION_RIGHT_SIDE,
    };
    this.contributorRightSideContainer = new BasicComponent(contributorRightSideContainerParams);

    this.contributorSectionHeading = new HeadingH2View(this.viewConfig.heading);
    this.contributorSubsections = [];
    this.viewConfig.subsections.forEach((subsectionSource) => {
      if (this.contributorSubsections === null) {
        this.contributorSubsections = [new ContributorSubsectionView(subsectionSource)];
      } else {
        this.contributorSubsections.push(new ContributorSubsectionView(subsectionSource));
      }
    });

    this.contributorRightSideContainer.addInnerElement(this.contributorSectionHeading);
    this.contributorSubsections.forEach((subsection) => {
      if (!this.contributorRightSideContainer) {
        throw new Error(
          'ERR in ContributorSectionView: missed `this.contributorRightSideContainer` BasicComponent while subsections adding!'
        );
      }
      this.contributorRightSideContainer.addInnerElement(subsection);
    });

    this.basicComponent.addInnerElement(this.contributorPhoto);
    this.basicComponent.addInnerElement(this.contributorRightSideContainer);
  }
}
