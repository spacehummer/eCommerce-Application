import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import { getProfile, isDefaultAddress } from '#src/logic/state/state';
import { Address } from '#src/logic/state/types';
import View from '#src/view/view';
import { CredentialFieldNames, PersonFieldNames } from '../signup-login/components/enums';
import FieldSet from '../signup-login/components/field-set';
import { ApiRequestResult } from '../signup-login/components/types';
import EditableForm from './components/user-data/editable-form';
import PersonalDataForm from './components/user-data/personal-data-form';
import PersonalesModel from './components/user-data/personales-model';
import { createDisplayAdress } from './field-factory';

const args: BasicComponentConstructorArgs = {
  tagName: TagsEnum.SECTION,
  classNames: ClassesEnum.SIGN_UP,
};

const sortPredicate = (a: Address, b: Address): number => {
  if (isDefaultAddress(a.id)) {
    return -1;
  }
  if (isDefaultAddress(b.id)) {
    return 1;
  }
  return 0;
};

const personalModel = new PersonalesModel();

export default class ProfileView extends View {
  protected personForm?: EditableForm;

  constructor() {
    super(args);

    const title = document.createElement(TagsEnum.H2);
    title.textContent = 'User Profile';

    this.basicComponent.addInnerElement(title);
    this.createFields();
  }

  private createFields(): void {
    const profile = getProfile();

    if (profile) {
      const personValues = [
        profile.email,
        profile.firstName,
        profile.lastName,
        profile.dateOfBirth,
      ];
      this.personForm = new PersonalDataForm(this.personDataCallback, personValues);

      const shippingAddresses = profile.addresses
        .filter((val) => profile.shippingAddressIds.find((shipId) => shipId === val.id))
        .sort(sortPredicate)
        .map(createDisplayAdress);
      const billingAddresses = profile.addresses
        .filter((val) => profile.billingAddressIds.find((billId) => billId === val.id))
        .sort(sortPredicate)
        .map(createDisplayAdress);

      this.basicComponent.addInnerElement(this.personForm);
      this.basicComponent.addInnerElement(new FieldSet('', 'Shipping Adresses', shippingAddresses));
      this.basicComponent.addInnerElement(new FieldSet('', 'Billing Adresses', billingAddresses));
    }
  }

  private personDataCallback = (record: Record<string, string | Record<string, string>>): void => {
    const {
      [CredentialFieldNames.Email]: email,
      [PersonFieldNames.FirstName]: firstName,
      [PersonFieldNames.LastName]: lastName,
      [PersonFieldNames.DateOfBirth]: dateOfBirth,
    } = record;
    const profile = getProfile();
    if (profile) {
      const { version } = profile;

      personalModel
        .apiCall({ version, email, firstName, lastName, dateOfBirth })
        .then((result: ApiRequestResult) => this.personForm?.showSubmitResults('Updated!', result));
    }
  };
}
