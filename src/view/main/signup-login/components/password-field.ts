import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import View from '#src/view/view';
import { IFormField } from './form-field';
import InputField, { FormFieldArgs } from './input-field';

const args: BasicComponentConstructorArgs = {
  tagName: TagsEnum.CONTAINER,
  classNames: ClassesEnum.FORM_FIELD_CONTAINER,
};

export default class PasswordField extends View implements IFormField {
  private readonly password: InputField;

  private readonly checkbox: InputField;

  public get input(): HTMLInputElement {
    return this.password.input;
  }

  public get label(): HTMLLabelElement {
    return this.password.label;
  }

  constructor(passArgs: FormFieldArgs) {
    super(args);

    this.password = new InputField(passArgs);

    this.checkbox = new InputField(
      {
        type: 'checkbox',
        name: 'showPassword',
        label: 'Show password',
        classList: [ClassesEnum.INPUT_CHECK],
      },
      'input-first'
    );

    this.checkbox.input.onclick = this.showHidePassword;

    this.checkbox.basicComponent.setCssClassesToElement([ClassesEnum.FORM_FIELD_CHECKBOX]);

    this.basicComponent.addInnerElement(this.password);
    this.basicComponent.addInnerElement(this.checkbox);
  }

  private readonly showHidePassword = (): void => {
    if (this.input.type === 'password') {
      this.input.type = 'text';
    } else {
      this.input.type = 'password';
    }
  };
}
