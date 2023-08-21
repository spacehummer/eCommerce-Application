import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import Validator from '#src/utils/validator';
import InputFactory, { InputType } from '../../login/components/inputFactory';
import LabelFactory from '../../login/components/labelFactory';
import { FormField, FormFieldContainer } from '../../login/components/types';
import View from '../../view';
import SignUpController from './signup-controller';
import '#assets/styles/sign-up.css';

const args: BasicComponentConstructorArgs = {
  tagName: TagsEnum.SECTION,
  classNames: ClassesEnum.SIGN_UP,
};

export default class SignUpView extends View {
  private readonly form: HTMLFormElement;

  private readonly emailInput: HTMLInputElement;

  private readonly passInput: HTMLInputElement;

  private readonly showPasswordChkBox: HTMLInputElement;

  private readonly errorMsg: HTMLParagraphElement;

  private readonly submitBtn: HTMLInputElement;

  private readonly controller: SignUpController;

  private readonly firstName: HTMLInputElement;

  private readonly lastName: HTMLInputElement;

  private readonly dateOfBirth: HTMLInputElement;

  private readonly street: HTMLInputElement;

  private readonly city: HTMLInputElement;

  private readonly postalCode: HTMLInputElement;

  private readonly okMsg: HTMLParagraphElement;

  private readonly country: HTMLSelectElement;

  constructor() {
    super(args);
    this.form = document.createElement('form');
    this.emailInput = document.createElement('input');
    this.passInput = document.createElement('input');
    this.showPasswordChkBox = document.createElement('input');

    this.firstName = document.createElement('input');
    this.lastName = document.createElement('input');
    this.dateOfBirth = document.createElement('input');

    this.street = document.createElement('input');
    this.city = document.createElement('input');
    this.postalCode = document.createElement('input');
    this.country = this.createSelectCountry();

    this.errorMsg = document.createElement('p');
    this.okMsg = document.createElement('p');
    this.submitBtn = document.createElement('input');
    this.createComponents();

    this.controller = new SignUpController();
    this.setLiesteners();
  }

  private wrap(...nodes: (Node | string)[]): HTMLDivElement {
    const root = document.createElement(TagsEnum.CONTAINER);
    root.classList.add(ClassesEnum.FORM_FIELD);
    root.append(...nodes);
    return root;
  }

  private createInput(
    elem: HTMLInputElement,
    type: InputType,
    { name, label, pattern, title }: FormField
  ): FormFieldContainer {
    const input = InputFactory.default(
      {
        type,
        id: name,
        name,
        pattern,
        title,
        classList: [ClassesEnum.INPUT],
      },
      elem
    );

    const inputLabel = LabelFactory.default({
      textContent: label,
      htmlFor: input.id,
    });

    const root = this.wrap(inputLabel, input);
    return {
      input,
      root,
      label: inputLabel,
    };
  }

  private createSelectCountry(): HTMLSelectElement {
    const result = document.createElement('select');
    const option = new Option('RUSSIA', 'RU', true, true);
    result.append(option);
    return result;
  }

  private createComponents(): void {
    const signUpTitle = document.createElement(TagsEnum.H2);
    signUpTitle.textContent = 'Sign up';

    this.form.classList.add(ClassesEnum.SIGN_UP_FORM);

    InputFactory.email(
      {
        classList: [ClassesEnum.INPUT],
        id: 'email',
        name: 'email',
        placeholder: 'Your email',
        required: true,
        title: Validator.emailMsg,
        pattern: Validator.emailRegex.source,
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
    chkBoxContainer.classList.add(ClassesEnum.FORM_FIELD_CHECKBOX);
    chkBoxContainer.append(this.showPasswordChkBox, chkBoxLabel);

    InputFactory.submit(
      {
        id: 'submit',
        value: 'Register',
        classList: [ClassesEnum.INPUT, ClassesEnum.INPUT_SUBMIT],
      },
      this.submitBtn
    );

    const okMsgContainer = document.createElement(TagsEnum.CONTAINER);
    okMsgContainer.append(this.okMsg);
    this.okMsg.hidden = true;
    this.okMsg.classList.add(ClassesEnum.FORM_OK_MESSAGE);

    const errMsgContainer = document.createElement(TagsEnum.CONTAINER);
    errMsgContainer.append(this.errorMsg);
    this.errorMsg.hidden = true;
    this.errorMsg.classList.add(ClassesEnum.FORM_ERROR_MESSAGE);

    const firsName = this.createInput(this.firstName, 'text', {
      name: 'firstName',
      label: 'First name',
      pattern: Validator.nameRegex.source,
      title: Validator.nameMsg,
    });
    const lastName = this.createInput(this.lastName, 'text', {
      name: 'lastName',
      label: 'Last name',
      pattern: Validator.nameRegex.source,
      title: Validator.nameMsg,
    });
    const dateOfBirth = this.createInput(this.dateOfBirth, 'date', {
      name: 'dateOfBirth',
      label: 'Date of birth',
    });
    dateOfBirth.input.setAttribute('min', '2010-08-21');
    const country = this.wrap('Country', this.country);
    const city = this.createInput(this.city, 'text', {
      name: 'city',
      label: 'City',
      pattern: Validator.nameRegex.source,
      title: Validator.nameMsg,
    });
    const street = this.createInput(this.street, 'text', { name: 'street', label: 'Street' });
    const postalCode = this.createInput(this.postalCode, 'text', {
      name: 'postalCode',
      label: 'Postal code',
    });

    this.form.append(
      okMsgContainer,
      errMsgContainer,
      emailLabel,
      this.emailInput,
      passLabel,
      this.passInput,
      chkBoxContainer,
      firsName.root,
      lastName.root,
      dateOfBirth.root,
      country,
      city.root,
      street.root,
      postalCode.root,
      this.submitBtn
    );

    this.basicComponent.addInnerElement(signUpTitle);
    this.basicComponent.addInnerElement(this.form);
  }

  private setLiesteners(): void {
    this.form.onsubmit = this.onSubmit;
    this.showPasswordChkBox.onclick = this.showPassword;
    this.emailInput.onchange = this.check;
    this.passInput.onchange = this.check;
  }

  private readonly showPassword = (): void => {
    if (this.passInput.type === 'password') {
      this.passInput.type = 'text';
    } else {
      this.passInput.type = 'password';
    }
  };

  private readonly check = (e: Event): void => {
    const input = e.currentTarget as HTMLInputElement;
    input.classList.remove(ClassesEnum.INPUT_INVALID);
    if (input.value.length > 0) {
      input.setCustomValidity('');
      const isValid = input.checkValidity();
      if (!isValid) {
        input.classList.add(ClassesEnum.INPUT_INVALID);
        input.setCustomValidity(input.title);
        input.form?.reportValidity();
      }
    } else {
      input.setCustomValidity('');
    }
  };

  private readonly onSubmit = (): boolean => {
    this.errorMsg.hidden = true;
    this.controller
      .signUp({
        email: this.emailInput.value,
        password: this.passInput.value,
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        dateOfBirth: this.dateOfBirth.value,
        countryCode: this.country.value,
        city: this.city.value,
        streetName: this.street.value,
        postalCode: this.postalCode.value,
        streetNumber: '',
      })
      .then((errorMsg: string) => {
        if (errorMsg) {
          this.errorMsg.textContent = errorMsg;
          this.errorMsg.hidden = false;
        } else {
          this.okMsg.textContent = 'Registation succsesful!';
          this.okMsg.hidden = false;
        }
      });
    return false;
  };
}
