type CustomerData = Readonly<{
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: Address[];
  shippingAddress: number;
  billingAddress?: number;
}>;

type Address = {
  country: string;
  streetName: string;
  streetNumber?: string;
  postalCode: string;
  city: string;
};

export default CustomerData;
