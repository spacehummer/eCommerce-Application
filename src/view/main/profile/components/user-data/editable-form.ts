import ClassesEnum from '#src/components_params/classes-enum';
import { PersonFieldNames } from '#src/view/main/signup-login/components/enums';
import FieldSet from '#src/view/main/signup-login/components/field-set';
import SignUpForm from '#src/view/main/signup-login/components/signup-form';
import { ErrorCollection } from '#src/view/main/signup-login/components/types';
import FormComponent from '../../../signup-login/components/form';
import EditButton from './edit-btn';
import EditableFieldSet from './editable-fieldset';
import CancelSubmit from './save-cancel-btn';

export default class EditableForm extends FormComponent {
  private readonly fieldSet: FieldSet;

  public readonly fieldSesName: string = 'user-data';

  private readonly editBtn: EditButton;

  private readonly submit: CancelSubmit;

  private defaultValues: string[];

  constructor(
    submitCallback: (record: Record<string, string | Record<string, string>>) => void,
    values: string[],
    private readonly isDisabledByDefault: boolean = true
  ) {
    super(submitCallback, Object.values(PersonFieldNames), ClassesEnum.LOGIN_FORM);

    this.defaultValues = values;

    this.submit = new CancelSubmit(this.cancel);

    this.editBtn = new EditButton(this.toggleForm);

    this.fieldSet = new EditableFieldSet(
      this.fieldSesName,
      'Personal data',
      SignUpForm.createPersonFields(),
      this.editBtn,
      this.submit
    );

    this.setValues();

    if (this.isDisabledByDefault) this.toggleSetItems();

    this.basicComponent.addInnerElement(this.fieldSet);
  }

  private setValues(): void {
    let index = 0;
    Array.from(this.fieldSet.elements).forEach((val) => {
      const elem = val;
      if (elem instanceof HTMLInputElement && elem.type !== 'submit') {
        elem.value = this.defaultValues[index];
        index += 1;
      } else if (elem instanceof HTMLSelectElement) {
        Array.from(elem.options).forEach((value) => {
          const option = value;
          if (option.value === this.defaultValues[index]) {
            option.selected = true;
            index += 1;
          }
        });
      }
    });
  }

  private readonly editBtnToggle = (): void => {
    this.editBtn.getHTMLElement()?.toggleAttribute('disabled');
  };

  private readonly toggleSetItems = (): void => {
    this.submit.getHTMLElement()?.classList.toggle(ClassesEnum.HIDDEN);
    this.fieldSet.getHTMLElement()?.toggleAttribute('disabled');
  };

  private readonly toggleForm = (): void => {
    this.toggleSetItems();
    this.editBtnToggle();
  };

  private readonly cancel = (): void => {
    this.setValues();
    this.toggleForm();
    this.errorMsg.hide();
    this.okMsg.hide();
  };

  public showSubmitResults(successMsg: string, errors?: ErrorCollection): void {
    if (!errors) this.toggleForm();
    super.showSubmitResults(successMsg, errors);
  }
}
