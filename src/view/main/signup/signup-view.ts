import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import View from '../../view';
import SignUpController from './signup-controller';
import '#assets/styles/sign-up.css';
import SignUpForm, { FieldName } from './components/signup-form';
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
      email: record[FieldName.Email],
      password: record[FieldName.Password],
      firstName: record[FieldName.FirstName],
      lastName: record[FieldName.LastName],
      dateOfBirth: record[FieldName.DateOfBirth],
      countryCode: record[FieldName.CountryCode],
      city: record[FieldName.City],
      streetName: record[FieldName.Street],
      postalCode: record[FieldName.PostalCode],
      streetNumber: '',
    };
    this.controller
      .signUp(data)
      .then((result: ApiRequestResult) => this.form.showSubmitResults(result));
  }
}
