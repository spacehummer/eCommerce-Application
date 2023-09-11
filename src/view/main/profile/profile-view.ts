import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import {
  getProfile,
  isDefaultAddress,
  isDefaultBillingAddress,
  isDefaultShippingAddress,
} from '#src/logic/state/state';
import { Address, Profile } from '#src/logic/state/types';
import View from '#src/view/view';
import { CredentialFieldNames, PersonFieldNames } from '../signup-login/components/enums';
import FieldSet from '../signup-login/components/field-set';
import { ApiRequestResult } from '../signup-login/components/types';
import ChangePassword from './components/password/change-password';
import EditableForm from './components/editable-form';
import PersonalDataForm from './components/user-data/personal-data-form';
import PersonalesModel from './components/user-data/personales-model';
import { createLabel } from './field-factory';
import UpdateModel from './components/address/update-model';
import AddressEditableForm, { AddressIdNames } from './components/address/address-editable-form';
import SignUpView from '../signup-login/signup-view';

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
const addressModel = new UpdateModel();

export default class ProfileView extends View {
  protected personForm?: EditableForm;

  protected addresses?: Map<string, AddressEditableForm>;

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
      const changePassword = new ChangePassword();

      const personValues = [
        profile.email,
        profile.firstName,
        profile.lastName,
        profile.dateOfBirth,
      ];
      this.personForm = new PersonalDataForm(this.personDataCallback, personValues);

      this.addresses = this.genAddreses(profile);

      this.basicComponent.addInnerElement(changePassword);
      this.basicComponent.addInnerElement(this.personForm);
      this.basicComponent.addInnerElement(
        new FieldSet('', 'Addresses', Array.from(this.addresses.values()))
      );
    }
  }

  private genAddreses(profile: Profile): Map<string, AddressEditableForm> {
    const res: Map<string, AddressEditableForm> = new Map();
    return profile.addresses.sort(sortPredicate).reduce((acc, val) => {
      const isBilling = profile.billingAddressIds.find((billId) => billId === val.id) !== undefined;
      const isShipping =
        profile.shippingAddressIds.find((shipId) => shipId === val.id) !== undefined;
      const isDefaultBilling = isDefaultBillingAddress(val.id);
      const isDefaultShipping = isDefaultShippingAddress(val.id);
      const label = createLabel({
        isBilling,
        isShipping,
        isDefaultBilling,
        isDefaultShipping,
        ...val,
      });
      acc.set(
        val.id,
        new AddressEditableForm(
          this.addressUpdateCallback,
          [
            val.country,
            val.city,
            val.streetName,
            val.postalCode,
            // getCheckboxValue(isBilling),
            // getCheckboxValue(isShipping),
            // getCheckboxValue(isDefaultAddress(val.id)),
            val.id,
          ],
          label
        )
      );
      return acc;
    }, res);
  }

  private addressUpdateCallback = (
    record: Record<string, string | Record<string, string>>
  ): void => {
    const {
      // [AddressStateFields.IsBilling]: isBilling,
      // [AddressStateFields.isShipping]: isShipping,
      // [AddressStateFields.IsDefault]: isDefault,
      [AddressIdNames.AddressId]: addressId,
    } = record;
    const address = SignUpView.getAddress(record as Record<string, string>);
    const profile = getProfile();
    const addressForm = this.addresses?.get(addressId as string);
    if (profile && addressForm) {
      const { version } = profile;

      addressModel
        .apiCall({
          version,
          ...address,
          // isBilling: getCheckboxCheckedValue(isBilling as string),
          // isShipping: getCheckboxCheckedValue(isShipping as string),
          // isDefault: getCheckboxCheckedValue(isDefault as string),
          addressId,
        })
        .then((result: ApiRequestResult) => addressForm.showSubmitResults('Updated!', result));
    }
  };

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
