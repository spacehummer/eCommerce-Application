import { BasicComponent, BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import View from '#src/view/view';
import AttributesNamesEnum from '#src/components_params/attributes-names-enum';

// import './contributor-subsection.css';

const viewRootParams: BasicComponentConstructorArgs = {
  tagName: TagsEnum.CONTAINER,
  classNames: ClassesEnum.PLACEHOLDER,
};

export interface ContributorPhotoConfig {
  src: string;
  alt: string;
}

export default class ContributorPhoto extends View {
  private readonly viewConfig: ContributorPhotoConfig;

  private img: BasicComponent | null;

  constructor(config: ContributorPhotoConfig) {
    super(viewRootParams);

    this.viewConfig = config;

    this.img = null;

    this.configureView();
  }

  private configureView(): void {
    const imgParams: BasicComponentConstructorArgs = {
      tagName: TagsEnum.IMG,
      classNames: ClassesEnum.PLACEHOLDER,
    };
    this.img = new BasicComponent(imgParams);
    this.img.setComponentAttribute(AttributesNamesEnum.SRC, this.viewConfig.src);
    this.img.setComponentAttribute(AttributesNamesEnum.ALT, this.viewConfig.alt);

    this.basicComponent.addInnerElement(this.img);
  }
}
