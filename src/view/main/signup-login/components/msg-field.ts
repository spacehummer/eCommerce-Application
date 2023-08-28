import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import View from '#src/view/view';

const args: BasicComponentConstructorArgs = {
  tagName: TagsEnum.CONTAINER,
  classNames: ClassesEnum.FORM_FIELD,
};
export default class MessageField extends View {
  private readonly msg: HTMLParagraphElement;

  constructor(classes: ClassesEnum | ClassesEnum[]) {
    super(args);

    this.msg = document.createElement(TagsEnum.PARAGRAPH);
    this.msg.hidden = true;
    if (Array.isArray(classes)) {
      this.msg.classList.add(ClassesEnum.FORM_MESSAGE, ...classes);
    } else {
      this.msg.classList.add(ClassesEnum.FORM_MESSAGE, classes);
    }

    this.basicComponent.addInnerElement(this.msg);
  }

  public show(message: string): void {
    this.msg.hidden = false;
    this.msg.textContent = message;
  }

  public hide(): void {
    this.msg.hidden = true;
  }
}
