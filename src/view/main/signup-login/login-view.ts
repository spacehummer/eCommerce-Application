import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import { ViewLogicParams } from '#src/view/view';
import LoginController from './login-controller';
import '#assets/styles/signup-login.css';
import LoginForm from './components/login-form';
import BaseView from './components/base-view';
import { CredentialFieldNames } from './components/enums';

const constructorArgs: BasicComponentConstructorArgs = {
  classNames: ClassesEnum.LOGIN,
  tagName: TagsEnum.SECTION,
};

export default class LoginView extends BaseView {
  private readonly controller: LoginController;

  constructor(logicParams: ViewLogicParams) {
    super(constructorArgs, logicParams);

    this.form = new LoginForm(this.login.bind(this));
    this.successMsg = 'Login successful!';
    this.title = 'Log in';

    this.createComponents();

    this.controller = new LoginController();
  }

  private login(record: Record<string, string | Record<string, string>>): void {
    const data = {
      email: record[CredentialFieldNames.Email] as string,
      password: record[CredentialFieldNames.Password] as string,
    };
    this.controller.login(data.email, data.password).then(this.showResults).then(this.redirectLazy);
  }
}
