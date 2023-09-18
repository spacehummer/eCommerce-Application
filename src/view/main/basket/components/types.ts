export type ProductCredentials = Readonly<{
  productId: string;
}>;

export type BasketProductCredentials = Readonly<{
  id: string;
  quantity: number;
}> &
  ProductCredentials;
