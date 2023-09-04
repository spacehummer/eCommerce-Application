import ClassesEnum from '#src/components_params/classes-enum';
import FieldSet from '#src/view/main/signup-login/components/field-set';
import { ErrorCollection } from '#src/view/main/signup-login/components/types';
import FormComponent from '../../signup-login/components/form';
import EditButton from './edit-btn';
import EditableFieldSet from './editable-fieldset';
import CancelSubmit from './save-cancel-btn';

export default abstract class EditableForm extends FormComponent {
  protected fieldSet?: FieldSet;

  public readonly editBtn: EditButton;

  protected submit?: CancelSubmit;

  constructor(
    submitCallback: (record: Record<string, string | Record<string, string>>) => void,
    private defaultValues: string[],
    names: string[],
    private readonly isDisabledByDefault: boolean = true
  ) {
    super(submitCallback, names, ClassesEnum.LOGIN_FORM);

    this.editBtn = new EditButton(this.toggleForm);
    this.submit = this.createCancel();
    this.fieldSet = this.createFieldSet();
    this.setValues();

    if (this.isDisabledByDefault) this.toggleSetItems();

    this.basicComponent.addInnerElement(this.fieldSet);
  }

  protected createCancel(): CancelSubmit {
    return new CancelSubmit(this.cancel);
  }

  protected abstract createFieldSet(): EditableFieldSet;

  public setValues(): void {
    let index = 0;
    if (this.fieldSet) {
      Array.from(this.fieldSet.elements).forEach((val) => {
        const elem = val;
        if (
          elem instanceof HTMLInputElement &&
          elem.type !== 'submit' &&
          elem.type !== 'checkbox'
        ) {
          if (this.defaultValues[index] !== undefined) {
            elem.value = this.defaultValues[index];
            index += 1;
          }
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
  }

  protected readonly editBtnToggle = (): void => {
    this.editBtn.getHTMLElement()?.toggleAttribute('disabled');
  };

  protected readonly toggleSetItems = (): void => {
    this.submit?.getHTMLElement()?.classList.toggle(ClassesEnum.HIDDEN);
    this.fieldSet?.getHTMLElement()?.toggleAttribute('disabled');
  };

  protected readonly toggleForm = (): void => {
    this.toggleSetItems();
    this.editBtnToggle();
  };

  protected readonly cancel = (): void => {
    this.setValues();
    this.toggleForm();
    this.errorMsg.hide();
    this.okMsg.hide();
  };

  protected readonly onSucces = (): void => {
    this.okMsg.hide();
  };

  public showSubmitResults(successMsg: string, errors?: ErrorCollection): void {
    if (!(errors && errors.errorMsg)) {
      this.toggleForm();
      setTimeout(() => {
        this.onSucces();
      }, 1500);
    }
    super.showSubmitResults(successMsg, errors);
  }
}
