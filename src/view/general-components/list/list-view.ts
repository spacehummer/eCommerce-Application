import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import TagsEnum from '#src/components_params/tags-enum';
import View from '#src/view/view';
import ClassesEnum from '#src/components_params/classes-enum';

const viewRootParams: BasicComponentConstructorArgs = {
  tagName: TagsEnum.MARKED_LIST,
  classNames: null,
};

export interface ListComponentConfig {
  type: 'marked' | 'linked';
  content: string;
  containerClasses: ClassesEnum[] | ClassesEnum;
  elementClasses: ClassesEnum[] | ClassesEnum;
}

export default class ListView extends View {
  private viewConfig: ListComponentConfig;

  constructor(config: ListComponentConfig) {
    super(viewRootParams);

    this.viewConfig = config;
    if (this.viewConfig.containerClasses) {
      this.basicComponent.addAdditionalClasses(this.viewConfig.containerClasses);
    }

    this.configureView();
  }

  private configureView(): void {
    // todo
  }
}
