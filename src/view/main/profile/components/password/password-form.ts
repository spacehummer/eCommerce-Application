import ClassesEnum from '#src/components_params/classes-enum';
import Validator from '#src/utils/validator';
import PasswordField from '#src/view/main/signup-login/components/password-field';
import EditableFieldSet from '../editable-fieldset';
import EditableForm from '../editable-form';
import CancelSubmit from '../save-cancel-btn';

export enum PasswordNames {
  CurrentPassword = 'currentPassword',
  NewPassword = 'newPassword',
}

export default class PasswordForm extends EditableForm {
  private paswordFields?: PasswordField[];

  constructor(
    submitCallback: (record: Record<string, string | Record<string, string>>) => void,
    private submitCancelCallback: () => void
  ) {
    super(submitCallback, ['', ''], Object.values(PasswordNames));

    this.getHTMLElement()?.classList.add(ClassesEnum.HIDDEN);
  }

  private setFieldsRequired(value: boolean): void {
    this.paswordFields?.forEach((val) => {
      const field = val;
      field.input.required = value;
    });
  }

  public show(): void {
    this.errorMsg.hide();
    this.okMsg.hide();
    this.setFieldsRequired(true);
    this.toggleForm();
    this.getHTMLElement()?.classList.remove(ClassesEnum.HIDDEN);
    this.setValues();
  }

  public hide(): void {
    this.setFieldsRequired(false);
    this.toggleForm();
    this.getHTMLElement()?.classList.add(ClassesEnum.HIDDEN);
    this.submitCancelCallback();
    this.setValues();
  }

  protected createFieldSet(): EditableFieldSet {
    this.submit = new CancelSubmit(this.hide.bind(this));
    this.editBtn.getHTMLElement()?.classList.add(ClassesEnum.HIDDEN);
    this.paswordFields = this.createFields();
    return new EditableFieldSet(
      'passwordChange',
      'Change Password',
      this.paswordFields,
      this.editBtn,
      this.submit
    );
  }

  protected readonly onSucces = (): void => {
    this.hide();
    this.toggleForm();
  };

  private createFields(): PasswordField[] {
    const currentPassword = new PasswordField({
      type: 'password',
      name: PasswordNames.CurrentPassword,
      label: 'Current Password',
      placeholder: 'Type Your Current Password',
      required: true,
      pattern: Validator.passwordRegex.source,
      title: Validator.passwordMsg,
    });
    const newPassword = new PasswordField({
      type: 'password',
      name: PasswordNames.NewPassword,
      label: 'New Password',
      placeholder: 'Type New Password',
      required: true,
      pattern: Validator.passwordRegex.source,
      title: Validator.passwordMsg,
    });
    return [currentPassword, newPassword];
  }
}
