import { LocalizedString, ProductVariant } from '@commercetools/platform-sdk';

export type ProductCart = Readonly<{
  id: string;
  name: LocalizedString;
  description?: LocalizedString;
  slug?: LocalizedString;
  masterVariant: ProductVariant;
}>;
