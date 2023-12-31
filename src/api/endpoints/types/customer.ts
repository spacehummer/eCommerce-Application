type CustomerData = Readonly<{
  addresses: Address[];
  shippingAddress: number;
  billingAddress?: number;
}> &
  Readonly<Credentials> &
  Readonly<PersonalData>;

type Address = {
  country: string;
  streetName: string;
  streetNumber?: string;
  postalCode: string;
  city: string;
};

type Credentials = Email & Password;

type Email = Readonly<{ email: string }>;

type Password = Readonly<{ password: string }>;

type PersonalData = Readonly<{
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}>;

type Version = Readonly<{ version: number }>;

export type PersonalesDto = PersonalData & Version & Email;

export type ChangePasswordDto = Readonly<{
  currentPassword: string;
  newPassword: string;
}> &
  Version;

export type AddressId = Readonly<{
  addressId: string;
}>;

type AddressState = Readonly<{
  isShipping: boolean;
  isBilling: boolean;
  isDefault: boolean;
}>;

export type DeleteAddressDto = AddressId & Version;

export type AddAddresDto = AddressState & Version & Readonly<Address>;

export type AddressDto = AddressId & AddressState & Version & Readonly<Address>;

export default CustomerData;
