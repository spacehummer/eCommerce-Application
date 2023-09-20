import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import View from '#src/view/view';

const viewRootParams: BasicComponentConstructorArgs = {
  tagName: TagsEnum.CONTAINER,
  classNames: ClassesEnum.PLACEHOLDER,
};

export interface SubsectionBlockConfig {
  type: 'paragraph' | 'list' | 'gh-link';
  content: string;
}

export default class ContributorSubsectionBlockView extends View {
  private viewConfig: SubsectionBlockConfig;

  constructor(config: SubsectionBlockConfig) {
    super(viewRootParams);

    this.viewConfig = config;

    this.configureView();
  }

  private configureView(): void {
    // this.basicComponent.addInnerElement(this.contributorSectionHeading);
  }
}
