import ClassesEnum from '#src/components_params/classes-enum';
import Validator from '#src/utils/validator';
import InputFactory from '#src/view/main/signup-login/components/utils/inputFactory';
import View from '#src/view/view';
import { CredentialFieldNames, PersonFieldNames, AddressFieldNames } from './enums';
import FieldSet from './field-set';
import FormComponent from './form';
import InputField from './input-field';
import PasswordField from './password-field';
import SelectField from './select-field';

export enum SignUpFieldNames {
  ShippingAddress = 'shippingAddress',
  BillingAddress = 'billingAddress',
  SetAsBillingToo = 'setAsBillingToo',
}

const getItemNames = (): string[] => [
  ...Object.values(CredentialFieldNames),
  ...Object.values(PersonFieldNames),
  ...Object.values(AddressFieldNames),
  ...Object.values(SignUpFieldNames),
];

export default class SignUpForm extends FormComponent {
  private readonly shippingFieldset: FieldSet;

  private readonly billingFieldset: FieldSet;

  constructor(submitCallback: (record: Record<string, string | Record<string, string>>) => void) {
    super(submitCallback, getItemNames(), ClassesEnum.SIGN_UP_FORM);

    const submit = InputFactory.submit({
      id: 'submit',
      value: 'Register',
      classList: [ClassesEnum.INPUT, ClassesEnum.INPUT_SUBMIT],
    });

    this.append(SignUpForm.createCustomerFields());

    const billingAddress = SignUpForm.createAdressFields();
    this.billingFieldset = new FieldSet(
      SignUpFieldNames.BillingAddress,
      'Billing address',
      billingAddress
    );

    const shippingAdresses = SignUpForm.createAdressFields();
    shippingAdresses.push(this.createAddressContr(this.billingFieldset));

    this.shippingFieldset = new FieldSet(
      SignUpFieldNames.ShippingAddress,
      'Shipping address',
      shippingAdresses
    );

    this.basicComponent.addInnerElement(this.shippingFieldset);
    this.basicComponent.addInnerElement(this.billingFieldset);

    this.basicComponent.addInnerElement(submit);
  }

  public static createCustomerFields(): View[] {
    const email = new InputField({
      type: 'email',
      name: CredentialFieldNames.Email,
      label: 'Email',
      placeholder: 'Your email',
      required: true,
      title: Validator.emailMsg,
      pattern: Validator.emailRegex.source,
    });
    const password = new PasswordField({
      type: 'password',
      name: CredentialFieldNames.Password,
      label: 'Password',
      placeholder: 'Your password',
      required: true,
      pattern: Validator.passwordRegex.source,
      title: Validator.passwordMsg,
    });
    return [email, password, ...this.createPersonFields()];
  }

  public static createPersonFields(): View[] {
    const firsName = new InputField({
      type: 'text',
      name: PersonFieldNames.FirstName,
      label: 'First name',
      required: true,
      pattern: Validator.nameRegex.source,
      title: Validator.nameMsg,
    });
    const lastName = new InputField({
      type: 'text',
      name: PersonFieldNames.LastName,
      label: 'Last name',
      pattern: Validator.nameRegex.source,
      title: Validator.nameMsg,
    });
    const dateOfBirth = this.createDate();
    return [firsName, lastName, dateOfBirth];
  }

  public static createDate(): InputField {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 13);

    return new InputField({
      type: 'date',
      name: PersonFieldNames.DateOfBirth,
      label: 'Date of birth',
      required: true,
      max: date.toISOString().split('T')[0],
    });
  }

  public static createAdressFields(): View[] {
    const country = new SelectField(
      AddressFieldNames.CountryCode,
      'Country',
      [{ text: 'RUSSIA', value: 'RU', defaultSelected: true, selected: true }],
      true
    );
    const city = new InputField({
      type: 'text',
      name: AddressFieldNames.City,
      label: 'City',
      required: true,
      pattern: Validator.nameRegex.source,
      title: Validator.nameMsg,
    });
    const street = new InputField({
      type: 'text',
      name: AddressFieldNames.Street,
      label: 'Street',
      required: true,
      pattern: Validator.streetRegex.source,
      title: Validator.streetMsg,
    });
    const postalCode = new InputField({
      type: 'text',
      name: AddressFieldNames.PostalCode,
      label: 'Postal code',
      required: true,
      pattern: Validator.postCodeRegex.source,
      title: Validator.postCodeMsg,
      minLength: 11,
      maxLength: 11,
    });
    return [country, city, street, postalCode];
  }

  private createAddressContr(view: FieldSet): InputField {
    const checkbox = new InputField(
      {
        type: 'checkbox',
        name: SignUpFieldNames.SetAsBillingToo,
        label: 'Set as default billing address.',
        classList: [ClassesEnum.INPUT_CHECK],
        value: 'off',
      },
      'input-first'
    );
    checkbox.basicComponent.setCssClassesToElement([ClassesEnum.FORM_FIELD_CHECKBOX]);

    checkbox.input.onclick = (): void => {
      const elem = view.getHTMLElement();
      if (elem) {
        elem.classList.toggle(ClassesEnum.HIDDEN);
        if (!checkbox.input.checked) {
          checkbox.input.value = 'off';
          view.setAttrForAllItems('required', '');
        } else {
          view.removeAttrForAllItems('required');
          checkbox.input.value = 'on';
        }
      }
    };

    return checkbox;
  }
}
