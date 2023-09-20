import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import TagsEnum from '#src/components_params/tags-enum';
import View from '#src/view/view';

const viewRootParams: BasicComponentConstructorArgs = {
  tagName: TagsEnum.MARKED_LIST,
  classNames: null,
};

export interface ListComponentConfig {
  type: 'marked' | 'linked';
  content: string;
}

export default class ListView extends View {
  private viewConfig: ListComponentConfig;

  constructor(config: ListComponentConfig) {
    super(viewRootParams);

    this.viewConfig = config;

    this.configureView();
  }

  private configureView(): void {
    // todo
  }
}
