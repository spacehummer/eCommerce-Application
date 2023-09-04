import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import { ViewLogicParams } from '../../view';
import SignUpController from './signup-controller';
import '#assets/styles/signup-login.css';
import SignUpForm, { SignUpFieldNames } from './components/signup-form';
import { AddressFieldNames, CredentialFieldNames, PersonFieldNames } from './components/enums';
import BaseView from './components/base-view';

const args: BasicComponentConstructorArgs = {
  tagName: TagsEnum.SECTION,
  classNames: ClassesEnum.SIGN_UP,
};

type Address = {
  country: string;
  streetName: string;
  postalCode: string;
  city: string;
};

export default class SignUpView extends BaseView {
  private readonly controller: SignUpController;

  constructor(logicParams: ViewLogicParams) {
    super(args, logicParams);

    this.form = new SignUpForm(this.signUp.bind(this));
    this.successMsg = 'Registation successful!';
    this.title = 'Sign up';

    this.createComponents();

    this.controller = new SignUpController();
  }

  public static getAddress = (rec: Record<string, string>): Address => {
    return {
      country: rec[AddressFieldNames.CountryCode],
      city: rec[AddressFieldNames.City],
      streetName: rec[AddressFieldNames.Street],
      postalCode: rec[AddressFieldNames.PostalCode],
    };
  };

  private signUp(record: Record<string, string | Record<string, string>>): void {
    const shippingAddressRecord = record[SignUpFieldNames.ShippingAddress] as Record<
      string,
      string
    >;
    const shippingAddress = SignUpView.getAddress(shippingAddressRecord);
    const billingAddressRecord = record[SignUpFieldNames.BillingAddress] as Record<string, string>;
    const billingAddress = SignUpView.getAddress(billingAddressRecord);
    const shipIsBill = shippingAddressRecord[SignUpFieldNames.SetAsBillingToo] === 'on';

    const [addresses, billingAddressIndex] = shipIsBill
      ? [[shippingAddress], 0]
      : [[shippingAddress, billingAddress], 1];
    const data = {
      email: record[CredentialFieldNames.Email] as string,
      password: record[CredentialFieldNames.Password] as string,
      firstName: record[PersonFieldNames.FirstName] as string,
      lastName: record[PersonFieldNames.LastName] as string,
      dateOfBirth: record[PersonFieldNames.DateOfBirth] as string,
      addresses,
      shippingAddress: 0,
      billingAddress: billingAddressIndex,
    };
    this.controller.signUp(data).then(this.showResults).then(this.redirectLazy);
  }
}
