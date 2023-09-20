import { BasicComponent, BasicComponentConstructorArgs } from '#src/components/basic-component';
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
  containerClasses: ClassesEnum[] | ClassesEnum | null;
  elementClasses: ClassesEnum[] | ClassesEnum | null;
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
    this.viewConfig.content.split('\n').forEach((elementText) => {
      const listElementParams: BasicComponentConstructorArgs = {
        tagName: TagsEnum.LIST_ITEM,
        classNames: this.viewConfig.elementClasses ? this.viewConfig.elementClasses : null,
        textContent: elementText,
      };
      const listElement = new BasicComponent(listElementParams);
      this.basicComponent.addInnerElement(listElement);
    });
  }
}
