import ClassesEnum from '#src/components_params/classes-enum';
import Validator from '#src/utils/validator';
import InputFactory from '#src/view/main/signup-login/components/utils/inputFactory';
import View from '#src/view/view';
import FormComponent from './form';
import InputField from './input-field';
import PasswordField from './password-field';
import SelectField from './select-field';

export enum SignUpFieldNames {
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

export default class SignUpForm extends FormComponent {
  constructor(submitCallback: (record: Record<string, string>) => void) {
    super(submitCallback, Object.values(SignUpFieldNames), ClassesEnum.SIGN_UP_FORM);

    const submit = InputFactory.submit({
      id: 'submit',
      value: 'Register',
      classList: [ClassesEnum.INPUT, ClassesEnum.INPUT_SUBMIT],
    });

    this.append(this.createPersonFields());
    this.append(this.createAdressFields());
    this.basicComponent.addInnerElement(submit);
  }

  private createPersonFields(): View[] {
    const email = new InputField({
      type: 'email',
      name: SignUpFieldNames.Email,
      label: 'Email',
      placeholder: 'Your email',
      required: true,
      title: Validator.emailMsg,
      pattern: Validator.emailRegex.source,
    });
    const password = new PasswordField({
      type: 'password',
      name: SignUpFieldNames.Password,
      label: 'Password',
      placeholder: 'Your password',
      required: true,
      pattern: Validator.passwordRegex.source,
      title: Validator.passwordMsg,
    });
    const firsName = new InputField({
      type: 'text',
      name: SignUpFieldNames.FirstName,
      label: 'First name',
      required: true,
      pattern: Validator.nameRegex.source,
      title: Validator.nameMsg,
    });
    const lastName = new InputField({
      type: 'text',
      name: SignUpFieldNames.LastName,
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
      name: SignUpFieldNames.DateOfBirth,
      label: 'Date of birth',
      max: date.toISOString().split('T')[0],
    });
  }

  private createAdressFields(): View[] {
    const country = new SelectField(SignUpFieldNames.CountryCode, 'Country', [
      { text: 'RUSSIA', value: 'RU', defaultSelected: true, selected: true },
    ]);
    const city = new InputField({
      type: 'text',
      name: SignUpFieldNames.City,
      label: 'City',
      pattern: Validator.nameRegex.source,
      title: Validator.nameMsg,
    });
    const street = new InputField({
      type: 'text',
      name: SignUpFieldNames.Street,
      label: 'Street',
      pattern: Validator.streetRegex.source,
      title: Validator.streetMsg,
    });
    const postalCode = new InputField({
      type: 'text',
      name: SignUpFieldNames.PostalCode,
      label: 'Postal code',
      pattern: Validator.postCodeRegex.source,
      title: Validator.postCodeMsg,
      minLength: 11,
      maxLength: 11,
    });
    return [country, city, street, postalCode];
  }
}
