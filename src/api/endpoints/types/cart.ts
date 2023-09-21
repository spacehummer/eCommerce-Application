export type CartUpdateDraft = {
  version: number;
  productId: string;
  variantId?: number;
  quantity: number;
};

export type ProductDetails = {
  cartId?: string;
  cartUpdateDraft: CartUpdateDraft;
};

export type CartRemoveItemDraft = {
  version: number;
  lineItemId: string;
  quantity?: number;
};

export type CartCredentials = Readonly<{
  version: number;
  id: string;
}>;

export type CartItemDraft = Readonly<{
  lineItemId?: string;
}>;

export type CartQuantityDraft = Readonly<{
  quantity: number;
}> &
  CartItemDraft &
  CartCredentials;

export type CartActionsDraft = Readonly<{
  items: CartItemDraft[];
}> &
  CartCredentials;

export type CartDiscountCodeDraft = Readonly<{
  code: string;
}> &
  CartCredentials;

export type CartDraft = {
  currency: string;
  customerEmail?: string;
};

export type MyCartUpdate = {
  version: number;
  actions: Array<MyCartUpdateAction>; // CartAddLineItemAction
};

type MyCartUpdateAction = {
  readonly action: 'addLineItem';
  readonly productId?: string;
  readonly variantId?: number;
  readonly quantity?: number;
};

export type MyCartRemoveItem = {
  version: number;
  actions: Array<MyCartRemoveLineItemAction>;
};

type MyCartRemoveLineItemAction = {
  readonly action: 'removeLineItem';
  readonly lineItemId?: string;
  readonly quantity?: number;
};
