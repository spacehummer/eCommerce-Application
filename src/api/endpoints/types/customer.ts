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

export default CustomerData;
