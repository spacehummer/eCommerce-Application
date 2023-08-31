import { Customer } from '@commercetools/platform-sdk';

export type Address = Readonly<{
  city: string;
  country: 'RU';
  id: string;
  postalCode: string;
  streetName: string;
}>;

type TechData = Readonly<{
  id: string;
  email: string;
  version: number;
  isEmailVerified: boolean;
}>;

type PersonalData = Readonly<{
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}>;

type Addresses = Readonly<{
  addresses: Address[];
  defaultShippingAddressId: string;
  defaultBillingAddressId: string;
  shippingAddressIds: string[];
  billingAddressIds: string[];
}>;

export type Profile = TechData & PersonalData & Addresses;

let profile: Profile;

export const getProfile = (): Profile => {
  return profile;
};

export const setProfile = (user: Customer): void => {
  profile = user as Profile;
};
