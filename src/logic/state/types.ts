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

export type ProfileAddress = Address & AddressState;

type AddressState = Readonly<{
  isBilling: boolean;
  isShipping: boolean;
  isDefaultBilling: boolean;
  isDefaultShipping: boolean;
}>;

export type Profile = TechData & PersonalData & Addresses;

export type EventType = 'login' | 'logout' | 'update';
