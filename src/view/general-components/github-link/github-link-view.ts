import { BasicComponent, BasicComponentConstructorArgs } from '#src/components/basic-component';
import TagsEnum from '#src/components_params/tags-enum';
import View from '#src/view/view';
import ClassesEnum from '#src/components_params/classes-enum';
import AttributesNamesEnum from '#src/components_params/attributes-names-enum';
import PathsObj from '#src/components_params/paths-obj';

import './github-link.css';

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

  private gitHubLogo: BasicComponent | null;

  private gitHubLink: BasicComponent | null;

  constructor(config: GithubLinkConfig) {
    super(viewRootParams);

    this.viewConfig = config;

    this.gitHubLogo = null;
    this.gitHubLink = null;

    this.configureView();
  }

  private configureView(): void {
    const gitHubLogoParams: BasicComponentConstructorArgs = {
      tagName: TagsEnum.IMG,
      classNames: ClassesEnum.GITHUB_LINK_LOGO,
    };
    this.gitHubLogo = new BasicComponent(gitHubLogoParams);
    this.gitHubLogo.setComponentAttribute(
      AttributesNamesEnum.SRC,
      PathsObj.GIT_HUB_LOGO_BLUE_DARK_75
    );

    const gitHubLinkParams: BasicComponentConstructorArgs = {
      tagName: TagsEnum.LINK,
      classNames: ClassesEnum.GITHUB_LINK_LINK,
      textContent: this.viewConfig.text,
    };
    this.gitHubLink = new BasicComponent(gitHubLinkParams);
    this.gitHubLink.setComponentAttribute(AttributesNamesEnum.HREF, this.viewConfig.link);

    this.basicComponent.addInnerElement(this.gitHubLogo);
    this.basicComponent.addInnerElement(this.gitHubLink);
  }
}
