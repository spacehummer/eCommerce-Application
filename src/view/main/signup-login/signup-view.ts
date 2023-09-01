import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import { ViewLogicParams } from '../../view';
import SignUpController from './signup-controller';
import '#assets/styles/signup-login.css';
import SignUpForm, { SignUpFieldNames } from './components/signup-form';
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

  private signUp(record: Record<string, string | Record<string, string>>): void {
    const getAddress = (rec: Record<string, string>): Address => {
      return {
        country: rec[SignUpFieldNames.CountryCode],
        city: rec[SignUpFieldNames.City],
        streetName: rec[SignUpFieldNames.Street],
        postalCode: rec[SignUpFieldNames.PostalCode],
      };
    };
    const shippingAddressRecord = record[SignUpFieldNames.ShippingAddress] as Record<
      string,
      string
    >;
    const shippingAddress = getAddress(shippingAddressRecord);
    const billingAddressRecord = record[SignUpFieldNames.BillingAddress] as Record<string, string>;
    const billingAddress = getAddress(billingAddressRecord);
    const shipIsBill = shippingAddressRecord[SignUpFieldNames.SetAsBillingToo] === 'on';

    const [addresses, billingAddressIndex] = shipIsBill
      ? [[shippingAddress], 0]
      : [[shippingAddress, billingAddress], 1];
    const data = {
      email: record[SignUpFieldNames.Email] as string,
      password: record[SignUpFieldNames.Password] as string,
      firstName: record[SignUpFieldNames.FirstName] as string,
      lastName: record[SignUpFieldNames.LastName] as string,
      dateOfBirth: record[SignUpFieldNames.DateOfBirth] as string,
      addresses,
      shippingAddress: 0,
      billingAddress: billingAddressIndex,
    };
    this.controller
      .signUp(data)
      .then(this.showResults)
      .then(this.redirect);
  }
}
