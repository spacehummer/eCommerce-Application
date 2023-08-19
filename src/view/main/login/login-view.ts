import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import View from '#src/view/view';
import LoginController from './login-controller';
import '#assets/styles/login.css';

const constructorArgs: BasicComponentConstructorArgs = {
  classNames: ClassesEnum.LOGIN,
  tagName: TagsEnum.SECTION,
};

export default class LoginView extends View {
  private readonly emailInput: HTMLInputElement;

  private readonly passInput: HTMLInputElement;

  private readonly form: HTMLFormElement;

  private readonly submitBtn: HTMLInputElement;

  private readonly errorMsg: HTMLElement;

  private readonly controller: LoginController;

  constructor() {
    super(constructorArgs);

    this.form = document.createElement('form');
    this.emailInput = document.createElement('input');
    this.passInput = document.createElement('input');
    this.submitBtn = document.createElement('input');
    this.errorMsg = document.createElement('p');
    this.createComponents();

    this.controller = new LoginController();
    this.setLiesteners();
  }

  private createComponents(): void {
    const loginTitle = document.createElement('h2');
    loginTitle.textContent = 'Log in';

    this.form.classList.add('login-form');

    this.emailInput.type = 'email';
    this.emailInput.id = 'email';
    this.emailInput.name = 'email';
    this.emailInput.placeholder = 'test@example.com';
    this.emailInput.required = true;
    this.emailInput.classList.add('form__input');

    const emailLabel = document.createElement('label');
    emailLabel.htmlFor = this.emailInput.id;
    emailLabel.textContent = 'Email';
    emailLabel.classList.add('form__label');

    this.passInput.type = 'password';
    this.passInput.id = 'password';
    this.passInput.name = 'password';
    this.passInput.placeholder = 'password';
    this.passInput.required = true;
    this.passInput.classList.add('form__input');

    const passLabel = document.createElement('label');
    passLabel.htmlFor = this.passInput.id;
    passLabel.textContent = 'Password';
    passLabel.classList.add('form__label');

    this.submitBtn.type = 'submit';
    this.submitBtn.value = 'Log in';

    this.form.append(emailLabel, this.emailInput, passLabel, this.passInput, this.submitBtn);

    this.errorMsg.hidden = true;

    this.basicComponent.addInnerElement(loginTitle);
    this.basicComponent.addInnerElement(this.errorMsg);
    this.basicComponent.addInnerElement(this.form);
  }

  private setLiesteners(): void {
    this.form.onsubmit = this.onSubmit;
  }

  private readonly onSubmit = (): boolean => {
    this.errorMsg.hidden = true;
    this.controller.login(this.emailInput.value, this.passInput.value).then((errorMsg: string) => {
      if (errorMsg) {
        this.errorMsg.textContent = errorMsg;
        this.errorMsg.hidden = false;
      }
    });
    return false;
  };
}
