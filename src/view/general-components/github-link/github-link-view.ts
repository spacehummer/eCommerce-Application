import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import TagsEnum from '#src/components_params/tags-enum';
import View from '#src/view/view';
import ClassesEnum from '#src/components_params/classes-enum';

const viewRootParams: BasicComponentConstructorArgs = {
  tagName: TagsEnum.CONTAINER,
  classNames: ClassesEnum.GITHUB_LINK,
};

export interface GithubLinkConfig {
  text: string;
  link: string;
}

export default class GithubLinkView extends View {
  private readonly viewConfig: GithubLinkConfig;

  constructor(config: GithubLinkConfig) {
    super(viewRootParams);

    this.viewConfig = config;

    this.configureView();
  }

  private configureView(): void {
    // TODO
  }
}
