import { LocalizedString, ProductVariant, TypedMoney } from '@commercetools/platform-sdk';

export type ProductCart = Readonly<{
  id: string;
  name: LocalizedString;
  description?: LocalizedString;
  slug?: LocalizedString;
  masterVariant: ProductVariant;
}>;

export type PriceValue = Readonly<{ value: TypedMoney }>;

export type ProductPrice = {
  discounted?: PriceValue;
} & PriceValue;

export type BasketProduct = Readonly<{
  product: ProductCart;
  id: string;
  quantity: number;
  totalPrice: PriceValue;
}>;
