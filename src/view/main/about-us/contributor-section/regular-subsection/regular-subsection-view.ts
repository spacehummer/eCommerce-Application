import ContributorSubsectionView, {
  SubsectionConfig,
} from '#src/view/main/about-us/contributor-section/contributor-subsection/contributor-subsection-view';

export default class RegularSubsectionView extends ContributorSubsectionView {
  private reusedClass: boolean;

  constructor(config: SubsectionConfig) {
    super(config);

    this.reusedClass = true;
  }
}
