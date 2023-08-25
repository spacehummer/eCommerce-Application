import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import View from '../../view';
import SignUpController from './signup-controller';
import '#assets/styles/signup-login.css';
import SignUpForm, { SignUpFieldNames } from './components/signup-form';
import { ApiRequestResult } from './components/types';

const args: BasicComponentConstructorArgs = {
  tagName: TagsEnum.SECTION,
  classNames: ClassesEnum.SIGN_UP,
};

export default class SignUpView extends View {
  private readonly form: SignUpForm;

  private readonly controller: SignUpController;

  constructor() {
    super(args);

    this.form = new SignUpForm(this.signUp.bind(this));

    this.createComponents();

    this.controller = new SignUpController();
  }

  private createComponents(): void {
    const signUpTitle = document.createElement(TagsEnum.H2);
    signUpTitle.textContent = 'Sign up';

    this.basicComponent.addInnerElement(signUpTitle);
    this.basicComponent.addInnerElement(this.form);
  }

  private signUp(record: Record<string, string>): void {
    const data = {
      email: record[SignUpFieldNames.Email],
      password: record[SignUpFieldNames.Password],
      firstName: record[SignUpFieldNames.FirstName],
      lastName: record[SignUpFieldNames.LastName],
      dateOfBirth: record[SignUpFieldNames.DateOfBirth],
      countryCode: record[SignUpFieldNames.CountryCode],
      city: record[SignUpFieldNames.City],
      streetName: record[SignUpFieldNames.Street],
      postalCode: record[SignUpFieldNames.PostalCode],
      streetNumber: '',
    };
    this.controller
      .signUp(data)
      .then((result: ApiRequestResult) =>
        this.form.showSubmitResults('Registation successful!', result)
      );
  }
}
