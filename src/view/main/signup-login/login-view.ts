import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import View from '#src/view/view';
import LoginController from './login-controller';
import '#assets/styles/signup-login.css';
import LoginForm, { LoginFieldNames } from './components/login-form';
import { ApiRequestResult } from './components/types';

const constructorArgs: BasicComponentConstructorArgs = {
  classNames: ClassesEnum.LOGIN,
  tagName: TagsEnum.SECTION,
};

export default class LoginView extends View {
  private readonly controller: LoginController;

  private readonly form: LoginForm;

  constructor() {
    super(constructorArgs);

    this.form = new LoginForm(this.login.bind(this));

    this.createComponents();

    this.controller = new LoginController();
  }

  private createComponents(): void {
    const loginTitle = document.createElement(TagsEnum.H2);
    loginTitle.textContent = 'Log in';

    this.basicComponent.addInnerElement(loginTitle);
    this.basicComponent.addInnerElement(this.form);
  }

  private login(record: Record<string, string>): void {
    const data = {
      email: record[LoginFieldNames.Email],
      password: record[LoginFieldNames.Password],
    };
    this.controller
      .login(data.email, data.password)
      .then((result: ApiRequestResult) => this.form.showSubmitResults('Login successful!', result));
  }
}
