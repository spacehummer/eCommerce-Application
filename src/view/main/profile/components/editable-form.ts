import ClassesEnum from '#src/components_params/classes-enum';
import FieldSet from '#src/view/main/signup-login/components/field-set';
import { ErrorCollection } from '#src/view/main/signup-login/components/types';
import FormComponent from '../../signup-login/components/form';
import { getCheckboxCheckedValue } from '../field-factory';
import EditButton from './edit-btn';
import EditableFieldSet from './editable-fieldset';
import CancelSubmit from './save-cancel-btn';

export default abstract class EditableForm extends FormComponent {
  protected fieldSet?: FieldSet;

  public readonly editBtn: EditButton;

  public submit?: CancelSubmit;

  constructor(
    submitCallback: (record: Record<string, string | Record<string, string>>) => void,
    protected defaultValues: string[],
    names: string[],
    private readonly isDisabledByDefault: boolean = true
  ) {
    super(submitCallback, names, ClassesEnum.LOGIN_FORM);

    this.editBtn = new EditButton(this.toggleForm.bind(this));
    this.submit = this.createCancel();
    this.fieldSet = this.createFieldSet();
    this.setValues();

    if (this.isDisabledByDefault) this.toggleSetItems();

    this.basicComponent.addInnerElement(this.fieldSet);
  }

  protected createCancel(): CancelSubmit {
    return new CancelSubmit(this.cancel.bind(this));
  }

  protected setId(id: string): void {
    this.form.id = id;
    this.submit?.submit.setAttribute('form', id);
  }

  protected abstract createFieldSet(): EditableFieldSet;

  public setValues(): void {
    let index = 0;
    if (this.fieldSet) {
      Array.from(this.fieldSet.elements).forEach((val) => {
        const elem = val;
        if (elem instanceof HTMLInputElement) {
          if (
            (elem.type !== 'submit' && elem.type !== 'checkbox' && elem.type !== 'button') ||
            (elem.type === 'checkbox' &&
              (this.defaultValues[index] === 'on' || this.defaultValues[index] === 'off'))
          ) {
            if (this.defaultValues[index] !== undefined) {
              elem.value = this.defaultValues[index];
              if (elem.type === 'checkbox') elem.checked = getCheckboxCheckedValue(elem.value);
              index += 1;
            }
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

  protected editBtnToggle(): void {
    this.editBtn.getHTMLElement()?.toggleAttribute('disabled');
  }

  protected toggleSetItems(): void {
    this.submit?.getHTMLElement()?.classList.toggle(ClassesEnum.HIDDEN);
    this.fieldSet?.getHTMLElement()?.toggleAttribute('disabled');
  }

  protected toggleForm(): void {
    this.toggleSetItems();
    this.editBtnToggle();
  }

  protected cancel(): void {
    this.setValues();
    this.toggleForm();
    this.errorMsg.hide();
    this.okMsg.hide();
  }

  protected onSucces(): void {
    this.okMsg.hide();
  }

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
