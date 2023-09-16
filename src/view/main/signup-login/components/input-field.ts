import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import InputFactory, {
  Args,
  InputType,
} from '#src/view/main/signup-login/components/utils/inputFactory';
import View from '#src/view/view';
import LabelFactory from './utils/labelFactory';
import { IFormField } from './form-field';

const args: BasicComponentConstructorArgs = {
  classNames: ClassesEnum.FORM_FIELD,
  tagName: TagsEnum.CONTAINER,
};

export type FormFieldArgs = Readonly<
  {
    type: InputType;
    name: string;
    label: string;
  } & Partial<Args>
>;

type Order = 'input-first' | 'label-first';

export default class InputField extends View implements IFormField {
  public readonly input: HTMLInputElement;

  public readonly label: HTMLLabelElement;

  constructor(fieldArgs: FormFieldArgs, order: Order = 'label-first') {
    super(args);

    this.input = this.createInput(fieldArgs);

    this.label = LabelFactory.default({
      textContent: fieldArgs.label,
    });

    this.input.onchange = this.onChange;
    this.addComponents(order);
  }

  protected addComponents(order: Order): void {
    if (order === 'label-first') {
      this.basicComponent.addInnerElement(this.label);
      this.basicComponent.addInnerElement(this.input);
    } else {
      this.basicComponent.addInnerElement(this.input);
      this.basicComponent.addInnerElement(this.label);
    }
  }

  protected createInput({ classList, label, ...fieldArgs }: FormFieldArgs): HTMLInputElement {
    const resultClassList = classList ? [ClassesEnum.INPUT, ...classList] : [ClassesEnum.INPUT];
    const res = { classList: resultClassList, ...fieldArgs };
    return InputFactory.default(res);
  }

  private onChange(e: Event): void {
    const input = e.currentTarget as HTMLInputElement;
    input.classList.remove(ClassesEnum.INPUT_INVALID);
    if (input.value.length > 0) {
      input.setCustomValidity('');
      const isValid = input.checkValidity();
      if (!isValid) {
        input.classList.add(ClassesEnum.INPUT_INVALID);
        input.setCustomValidity(input.title);
        input.reportValidity();
      }
    } else {
      input.setCustomValidity('');
    }
  }
}
