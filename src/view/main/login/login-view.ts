import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import View from '#src/view/view';
import Validator from '#src/utils/validator';
import LoginController from './login-controller';
import '#assets/styles/login.css';
import InputFactory from './components/inputFactory';
import LabelFactory from './components/labelFactory';

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

  private readonly showPasswordChkBox: HTMLInputElement;

  constructor() {
    super(constructorArgs);

    this.form = document.createElement('form');
    this.emailInput = document.createElement('input');
    this.passInput = document.createElement('input');
    this.submitBtn = document.createElement('input');
    this.showPasswordChkBox = document.createElement('input');
    this.errorMsg = document.createElement('p');
    this.createComponents();

    this.controller = new LoginController();
    this.setLiesteners();
  }

  private createComponents(): void {
    const loginTitle = document.createElement(TagsEnum.H2);
    loginTitle.textContent = 'Log in';

    this.form.classList.add(ClassesEnum.LOGIN_FORM);

    InputFactory.email(
      {
        classList: [ClassesEnum.INPUT],
        id: 'email',
        name: 'email',
        placeholder: 'Your email',
        required: true,
        title: Validator.emailMsg,
      },
      this.emailInput
    );

    const emailLabel = LabelFactory.default({
      textContent: 'Email',
      htmlFor: this.emailInput.id,
    });

    InputFactory.password(
      {
        classList: [ClassesEnum.INPUT],
        id: 'password',
        name: 'password',
        placeholder: 'Your password',
        required: true,
        pattern: Validator.passwordRegex.source,
        title: Validator.passwordMsg,
      },
      this.passInput
    );

    const passLabel = LabelFactory.default({
      textContent: 'Password',
      htmlFor: this.emailInput.id,
    });

    InputFactory.default(
      {
        type: 'checkbox',
        id: 'showPassword',
        classList: [ClassesEnum.INPUT_CHECK, ClassesEnum.INPUT],
      },
      this.showPasswordChkBox
    );

    const chkBoxLabel = LabelFactory.default({
      textContent: 'Show password',
      htmlFor: this.showPasswordChkBox.id,
    });

    const chkBoxContainer = document.createElement(TagsEnum.CONTAINER);
    chkBoxContainer.classList.add(ClassesEnum.FORM_FIELD);
    chkBoxContainer.append(this.showPasswordChkBox, chkBoxLabel);

    InputFactory.submit(
      {
        id: 'submit',
        value: 'Log in',
        classList: [ClassesEnum.INPUT, ClassesEnum.INPUT_SUBMIT],
      },
      this.submitBtn
    );

    const errMsgContainer = document.createElement(TagsEnum.CONTAINER);
    errMsgContainer.append(this.errorMsg);
    this.errorMsg.hidden = true;
    this.errorMsg.classList.add(ClassesEnum.FORM_ERROR_MESSAGE);

    this.form.append(
      errMsgContainer,
      emailLabel,
      this.emailInput,
      passLabel,
      this.passInput,
      chkBoxContainer,
      this.submitBtn
    );

    this.basicComponent.addInnerElement(loginTitle);
    this.basicComponent.addInnerElement(this.form);
  }

  private setLiesteners(): void {
    this.form.onsubmit = this.onSubmit;
    this.showPasswordChkBox.onclick = this.showPassword;
  }

  private readonly showPassword = (): void => {
    if (this.passInput.type === 'password') {
      this.passInput.type = 'text';
    } else {
      this.passInput.type = 'password';
    }
  };

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
