import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import TagsEnum from '#src/components_params/tags-enum';
import View from '#src/view/view';
import ParagraphView from '#src/view/general-components/paragraph/paragraph-view';
import ListView, { ListComponentConfig } from '#src/view/general-components/list/list-view';
import ClassesEnum from '#src/components_params/classes-enum';

const viewRootParams: BasicComponentConstructorArgs = {
  tagName: TagsEnum.CONTAINER,
  classNames: null,
};

export interface SubsectionBlockConfig {
  type: 'paragraph' | 'list' | 'gh-link';
  content: string;
}

const listConfig: ListComponentConfig = {
  type: 'marked',
  content: '',
  textStyle: 'paragraph-type-2',
  containerClasses: ClassesEnum.ABOUT_US_SECTION_CONTRIBUTORS_LIST,
  elementClasses: ClassesEnum.ABOUT_US_SECTION_CONTRIBUTORS_LIST_ELEMENT,
};

export default class ContributorSubsectionBlockView extends View {
  private viewConfig: SubsectionBlockConfig;

  constructor(config: SubsectionBlockConfig) {
    super(viewRootParams);

    this.viewConfig = config;

    this.configureView();
  }

  private configureView(): void {
    let newViewBasicComponentSource: ParagraphView | ListView;
    switch (this.viewConfig.type) {
      case 'paragraph':
        newViewBasicComponentSource = new ParagraphView(this.viewConfig.content);
        break;
      case 'list':
        listConfig.content = this.viewConfig.content;
        newViewBasicComponentSource = new ListView(listConfig);
        break;
      case 'gh-link':
        newViewBasicComponentSource = new ParagraphView(this.viewConfig.content);
        break;
      default:
        throw new Error(
          'ERR in ContributorSubsectionBlockView: unexpected value of `SubsectionBlockConfig.type`!'
        );
    }
    this.basicComponent = newViewBasicComponentSource.basicComponent;
  }
}
