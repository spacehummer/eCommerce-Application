import ClassesEnum from '#src/components_params/classes-enum';
import Validator from '#src/utils/validator';
import View from '#src/view/view';
import FormComponent from './form';
import InputField from './input-field';
import PasswordField from './password-field';
import InputFactory from './utils/inputFactory';

export enum LoginFieldNames {
  Email = 'email',
  Password = 'password',
}

export default class LoginForm extends FormComponent {
  constructor(submitCallback: (record: Record<string, string>) => void) {
    super(submitCallback, Object.values(LoginFieldNames), ClassesEnum.LOGIN_FORM);

    const submit = InputFactory.submit({
      id: 'submit',
      value: 'Log in',
      classList: [ClassesEnum.INPUT, ClassesEnum.INPUT_SUBMIT],
    });

    this.append(this.createComponents());

    this.basicComponent.addInnerElement(submit);
  }

  private createComponents(): View[] {
    const email = new InputField({
      type: 'email',
      name: LoginFieldNames.Email,
      label: 'Email',
      placeholder: 'Your email',
      required: true,
      title: Validator.emailMsg,
      pattern: Validator.emailRegex.source,
    });
    const password = new PasswordField({
      type: 'password',
      name: LoginFieldNames.Password,
      label: 'Password',
      placeholder: 'Your password',
      required: true,
      pattern: Validator.passwordRegex.source,
      title: Validator.passwordMsg,
    });
    return [email, password];
  }
}
