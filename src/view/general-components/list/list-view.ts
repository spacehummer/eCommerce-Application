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
  textStyle?: 'paragraph-type-1' | 'paragraph-type-2';
  containerClasses?: ClassesEnum[] | ClassesEnum;
  elementClasses?: ClassesEnum[] | ClassesEnum;
}

export default class ListView extends View {
  private readonly viewConfig: ListComponentConfig;

  constructor(config: ListComponentConfig) {
    super(viewRootParams);

    this.viewConfig = config;
    if (this.viewConfig.containerClasses) {
      this.basicComponent.addAdditionalClasses(this.viewConfig.containerClasses);
    }

    this.configureView();
  }

  private configureView(): void {
    if (this.viewConfig) {
      if (this.viewConfig.textStyle) {
        switch (this.viewConfig.textStyle) {
          case 'paragraph-type-1':
            this.basicComponent.addAdditionalClasses(ClassesEnum.FONT_PARAGRAPH_1);
            break;
          case 'paragraph-type-2':
            this.basicComponent.addAdditionalClasses(ClassesEnum.FONT_PARAGRAPH_2);
            break;
          default:
            throw new Error('ERR in ListView: unexpected value of `viewConfig.textStyle`!');
        }
      }
    } else {
      this.basicComponent.addAdditionalClasses(ClassesEnum.FONT_PARAGRAPH_2);
    }

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
