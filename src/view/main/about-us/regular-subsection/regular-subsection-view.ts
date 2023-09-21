import ContributorSubsectionView, {
  SubsectionConfig,
} from '#src/view/main/about-us/contributor-section/contributor-subsection/contributor-subsection-view';
import ClassesEnum from '#src/components_params/classes-enum';

import './regular-subsection.css';

export default class RegularSubsectionView extends ContributorSubsectionView {
  constructor(config: SubsectionConfig) {
    super(config);

    this.reconfigureView();
  }

  private reconfigureView(): void {
    this.basicComponent
      .getHTMLElement()
      ?.classList.add(ClassesEnum.ABOUT_US_SECTION_REGULAR_SUBSECTION);
  }
}
