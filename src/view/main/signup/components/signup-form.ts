import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import Validator from '#src/utils/validator';
import InputFactory from '#src/view/login/components/inputFactory';
import View from '#src/view/view';
import InputField from './input-field';
import PasswordField from './password-field';
import SelectField from './select-field';
import { ErrorCollection } from './types';

const args: BasicComponentConstructorArgs = {
  tagName: TagsEnum.FORM,
  classNames: ClassesEnum.SIGN_UP_FORM,
};

export enum FieldName {
  FirstName = 'firstName',
  DateOfBirth = 'dateOfBirth',
  LastName = 'lastName',
  CountryCode = 'countryCode',
  City = 'city',
  Email = 'email',
  Password = 'password',
  Street = 'street',
  PostalCode = 'postalCode',
}

export default class SignUpForm extends View {
  private readonly errorMsg: HTMLParagraphElement;

  private readonly okMsg: HTMLParagraphElement;

  private get form(): HTMLFormElement {
    return this.basicComponent.getHTMLElement() as HTMLFormElement;
  }

  public get elements(): HTMLFormControlsCollection {
    return this.form.elements;
  }

  constructor(private readonly submitCallback: (record: Record<string, string>) => void) {
    super(args);

    const submit = InputFactory.submit({
      id: 'submit',
      value: 'Register',
      classList: [ClassesEnum.INPUT, ClassesEnum.INPUT_SUBMIT],
    });

    this.errorMsg = document.createElement('p');
    this.okMsg = document.createElement('p');

    const okMsgContainer = this.createMsg(this.okMsg, [
      ClassesEnum.FORM_FIELD,
      ClassesEnum.FORM_OK_MESSAGE,
    ]);
    const errMsgContainer = this.createMsg(this.errorMsg, [ClassesEnum.FORM_ERROR_MESSAGE]);

    this.basicComponent.addInnerElement(okMsgContainer);
    this.basicComponent.addInnerElement(errMsgContainer);

    this.append(this.createPersonFields());
    this.append(this.createAdressFields());
    this.basicComponent.addInnerElement(submit);

    this.form.onsubmit = this.onSubmit;
  }

  private append(items: View[]): void {
    items.forEach((item) => this.basicComponent.addInnerElement(item));
  }

  private createMsg(p: HTMLParagraphElement, classes: string[]): HTMLDivElement {
    const msg = p;
    const okMsgContainer = document.createElement(TagsEnum.CONTAINER);
    okMsgContainer.append(p);
    msg.hidden = true;
    msg.classList.add(...classes);
    return okMsgContainer;
  }

  private createPersonFields(): View[] {
    const email = new InputField({
      type: 'email',
      name: FieldName.Email,
      label: 'Email',
      placeholder: 'Your email',
      required: true,
      title: Validator.emailMsg,
      pattern: Validator.emailRegex.source,
    });
    const password = new PasswordField({
      type: 'password',
      name: FieldName.Password,
      label: 'Password',
      placeholder: 'Your password',
      required: true,
      pattern: Validator.passwordRegex.source,
      title: Validator.passwordMsg,
    });
    const firsName = new InputField({
      type: 'text',
      name: FieldName.FirstName,
      label: 'First name',
      required: true,
      pattern: Validator.nameRegex.source,
      title: Validator.nameMsg,
    });
    const lastName = new InputField({
      type: 'text',
      name: FieldName.LastName,
      label: 'Last name',
      pattern: Validator.nameRegex.source,
      title: Validator.nameMsg,
    });
    const dateOfBirth = this.createDate();
    return [email, password, firsName, lastName, dateOfBirth];
  }

  private createDate(): InputField {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 13);

    return new InputField({
      type: 'date',
      name: FieldName.DateOfBirth,
      label: 'Date of birth',
      max: date.toISOString().split('T')[0],
    });
  }

  private createAdressFields(): View[] {
    const country = new SelectField(FieldName.CountryCode, 'Country', [
      { text: 'RUSSIA', value: 'RU', defaultSelected: true, selected: true },
    ]);
    const city = new InputField({
      type: 'text',
      name: FieldName.City,
      label: 'City',
      pattern: Validator.nameRegex.source,
      title: Validator.nameMsg,
    });
    const street = new InputField({
      type: 'text',
      name: FieldName.Street,
      label: 'Street',
      pattern: Validator.streetRegex.source,
      title: Validator.streetMsg,
    });
    const postalCode = new InputField({
      type: 'text',
      name: FieldName.PostalCode,
      label: 'Postal code',
      pattern: Validator.postCodeRegex.source,
      title: Validator.postCodeMsg,
      minLength: 11,
      maxLength: 11,
    });
    return [country, city, street, postalCode];
  }

  private submit(): Record<string, string> {
    const values = Object.values(FieldName);
    const result: Record<string, string> = {};

    values.reduce((acc, value) => {
      const elem = this.elements.namedItem(value) as HTMLInputElement;
      acc[value] = elem.value;
      return acc;
    }, result);

    return result;
  }

  public showSubmitResults(errors?: ErrorCollection): void {
    if (errors && errors.errorMsg) {
      errors.error?.forEach((value) => {
        if (value.field) {
          const namedItem = this.elements.namedItem(value.field);
          if (namedItem) {
            const input = namedItem as HTMLInputElement;
            input.setCustomValidity(value.message);
            input.checkValidity();
          }
        }
      });
      this.errorMsg.textContent = errors.errorMsg;
      this.errorMsg.hidden = false;
      this.form.reportValidity();
    } else {
      this.okMsg.textContent = 'Registation succsesful!';
      this.okMsg.hidden = false;
    }
  }

  private readonly onSubmit = (): boolean => {
    this.errorMsg.hidden = true;
    this.okMsg.hidden = true;
    this.submitCallback(this.submit());
    return false;
  };
}
