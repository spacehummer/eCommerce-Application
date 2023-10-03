import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import InputFactory, { InputType } from '#src/view/main/signup-login/components/utils/inputFactory';
import View from '#src/view/view';

type ButtonType = Extract<InputType, 'submit' | 'button'>;

const args: BasicComponentConstructorArgs = {
  classNames: ClassesEnum.FORM_FIELD,
  tagName: TagsEnum.CONTAINER,
};

const btnStyle = [ClassesEnum.INPUT, ClassesEnum.INPUT_SUBMIT];

export default class CancelSubmit extends View {
  public readonly submit: HTMLInputElement;

  public readonly cancel?: HTMLButtonElement;

  constructor(
    cancelCallback?: () => void,
    submitBtnText: string = 'Save',
    submitType: ButtonType = 'submit',
    cancelBtmText: string = 'Cancel'
  ) {
    super(args);

    this.submit = InputFactory.default({
      type: submitType,
      value: submitBtnText,
      classList: btnStyle,
    });

    this.basicComponent.addInnerElement(this.submit);

    if (cancelCallback) {
      this.cancel = document.createElement(TagsEnum.BUTTON);
      this.cancel.textContent = cancelBtmText;
      this.cancel.classList.add(...btnStyle);
      this.cancel.setAttribute('type', 'button');
      this.cancel.onclick = cancelCallback;
      this.basicComponent.addInnerElement(this.cancel);
    }
  }
}
