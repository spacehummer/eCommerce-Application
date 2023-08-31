import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import { Address, getProfile } from '#src/logic/state/profile';
import View from '#src/view/view';
import FieldSet from '../signup-login/components/field-set';
import { createDisplayField } from './field-factory';

const args: BasicComponentConstructorArgs = {
  tagName: TagsEnum.SECTION,
  classNames: ClassesEnum.SIGN_UP,
};

export default class ProfileView extends View {
  constructor() {
    super(args);

    const title = document.createElement(TagsEnum.H2);
    title.textContent = 'User Profile';

    this.basicComponent.addInnerElement(title);
    this.createFields();
  }

  private createFields(): void {
    const profile = getProfile();

    const isDefaultAddress = (id: string): boolean =>
      id === profile.defaultShippingAddressId || id === profile.defaultBillingAddressId;

    const createAdress = (val: Address): FieldSet => {
      const fields = [
        createDisplayField('Country', val.country),
        createDisplayField('City', val.city),
        createDisplayField('Street', val.streetName),
        createDisplayField('Postal code', val.postalCode),
      ];
      const label = isDefaultAddress(val.id) ? 'Default' : '';
      return new FieldSet('', label, fields);
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

    if (profile) {
      const firstName = createDisplayField('First Name', profile.firstName);

      const lastName = createDisplayField('LastName', profile.lastName);

      const dateOfBirth = createDisplayField('Date of birth', profile.dateOfBirth);

      const shippingAddresses = profile.addresses
        .filter((val) => profile.shippingAddressIds.find((shipId) => shipId === val.id))
        .sort(sortPredicate)
        .map(createAdress);
      const billingAddresses = profile.addresses
        .filter((val) => profile.billingAddressIds.find((billId) => billId === val.id))
        .sort(sortPredicate)
        .map(createAdress);

      this.basicComponent.addInnerElement(firstName);
      this.basicComponent.addInnerElement(lastName);
      this.basicComponent.addInnerElement(dateOfBirth);
      this.basicComponent.addInnerElement(new FieldSet('', 'Shipping Adresses', shippingAddresses));
      this.basicComponent.addInnerElement(new FieldSet('', 'Billing Adresses', billingAddresses));
    }
  }
}
