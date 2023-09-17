import { BasicComponent, BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import View from '#src/view/view';

const args: BasicComponentConstructorArgs = {
  classNames: ClassesEnum.ONLY_FOR_DRAFT_CODE,
  tagName: TagsEnum.PARAGRAPH,
};
const valueArgs: BasicComponentConstructorArgs = {
  classNames: ClassesEnum.ONLY_FOR_DRAFT_CODE,
  tagName: TagsEnum.SPAN,
};

export default class PriceComponent extends View {
  private value: BasicComponent;

  constructor(label: string, value: string) {
    super(args);
    this.basicComponent.setTextContent(`${label}: `);
    this.value = new BasicComponent(valueArgs);
    this.value.setTextContent(value);
    this.basicComponent.addInnerElement(this.value);
  }

  public setPrice(value: string): void {
    this.value.setTextContent(value);
  }
}