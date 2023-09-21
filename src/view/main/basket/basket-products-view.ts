import { Cart, CentPrecisionMoney, LineItem } from '@commercetools/platform-sdk';
import ClassesEnum from '#src/components_params/classes-enum';
import cartState from '#src/logic/state/cartState';
import ProductsView from '../catalog/components/product-view';
import { ProductPrice } from '../catalog/components/types';
import BasketModel from './basket-model';
import BasketProductCart from './basket-product-cart';
import AddToCartForm from './components/add-to-cart-form';
import ModifyQuantity, { BasketItemFields } from './components/modify-quantiy-form';
import { BasketProductCredentials } from './components/types';

const basketModel = new BasketModel();

type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export default class BasketProductsView extends ProductsView {
  constructor() {
    super(undefined, ClassesEnum.BASKET_CART_LIST);
  }

  protected callback(record: Record<string, string | Record<string, string>>): void {
    const lineItemId = record[BasketItemFields.BasketItemId] as string;
    const quantity = record[BasketItemFields.Quantity] as string;
    const productId = record[BasketItemFields.ProductId] as string;
    const basket = cartState.getCart();
    if (basket) {
      const { id, version } = basket;
      basketModel
        .updateQuantity({ id, version, lineItemId, quantity: Number.parseInt(quantity, 10) })
        .then((val) => {
          if (val.response) {
            if (this.productCarts) {
              const cart = this.productCarts[productId] as BasketProductCart;
              if (cart) {
                const lineItem = val.response.body.lineItems.find((item) => item.id === lineItemId);
                if (lineItem) cart.itemTotal.setPrice(this.countItemTotal(lineItem));

                cart.addToCartFrom?.showSubmitResults('Quantity changed!', val);
              }
            }
          }
        });
    }
  }

  private isItemDiscounted(lineItem: LineItem): boolean {
    return !!(lineItem.price.discounted || lineItem.discountedPricePerQuantity[0]);
  }

  private countItemPrice(lineItem: LineItem): ProductPrice {
    // const isItemDiscounted = lineItem.price.discounted ? true : false;
    const price = lineItem.price.value;
    const isDisc = !!lineItem.discountedPricePerQuantity[0];
    const discounted = isDisc
      ? lineItem.discountedPricePerQuantity[0].discountedPrice
      : lineItem.price.discounted;
    return { value: price, discounted };
  }

  private countItemTotal(lineItem: LineItem): ProductPrice {
    const isItemDiscounted = this.isItemDiscounted(lineItem);
    const { centAmount, currencyCode, fractionDigits } = lineItem.price.value;
    const total: CentPrecisionMoney = isItemDiscounted
      ? {
          type: 'centPrecision',
          centAmount: centAmount * lineItem.quantity,
          currencyCode,
          fractionDigits,
        }
      : lineItem.totalPrice;
    const totalDiscount = isItemDiscounted ? { value: lineItem.totalPrice } : undefined;
    return { value: total, discounted: totalDiscount };
  }

  public updateCartPrices(cart: Cart): Writeable<ProductPrice> {
    const totalAmount: Writeable<ProductPrice> = { value: cart.totalPrice };
    let isDiscounted = false;
    let totalCentAmount: number = 0;
    cart.lineItems.forEach((lineItem) => {
      if (this.productCarts) {
        const basketCart = this.productCarts[lineItem.productId] as BasketProductCart;
        if (basketCart) {
          const isItemDiscounted = this.isItemDiscounted(lineItem);
          if (!isDiscounted && isItemDiscounted) isDiscounted = true;
          // const price = lineItem.price.discounted ? lineItem.price.discounted.value : lineItem.price.value

          // const price = lineItem.price.value
          // const discounted = lineItem.discountedPricePerQuantity[0]?.discountedPrice
          const price = this.countItemPrice(lineItem);
          basketCart.pricesComponent?.setPrice(price); // ({ value: price, discounted })
          // const { centAmount, currencyCode, fractionDigits } = price
          // const total: CentPrecisionMoney = isItemDiscounted ? { type: 'centPrecision', centAmount: centAmount * lineItem.quantity, currencyCode, fractionDigits } : lineItem.totalPrice
          // const totalDiscount = isItemDiscounted ? { value: lineItem.totalPrice } : undefined
          const itemTotal = this.countItemTotal(lineItem);
          basketCart.itemTotal.setPrice(this.countItemTotal(lineItem)); // ({ value: total, discounted: totalDiscount })
          totalCentAmount += itemTotal.value.centAmount;
        }
      }
    });
    if (isDiscounted) {
      totalAmount.discounted = { value: cart.totalPrice };
      const { currencyCode, fractionDigits, type } = cart.totalPrice;
      totalAmount.value = { centAmount: totalCentAmount, currencyCode, fractionDigits, type };
    }
    return totalAmount;
  }

  public setBasketProducts(prods: LineItem[]): void {
    this.replaceCarts(this.createBasketCarts(prods));
  }

  protected factory(values: BasketProductCredentials): AddToCartForm {
    return new ModifyQuantity(this.callback.bind(this), values);
  }

  protected createBasketCarts(prods: LineItem[]): HTMLElement[] {
    this.productCarts = {};
    return prods.map((prod: LineItem) => {
      const cart = new BasketProductCart(prod, this.factory.bind(this));
      cart.createAddToBasket();
      cart.createRemoveProductBtn(() => {
        if (this.productCarts && this.productCarts[cart.id]) delete this.productCarts[cart.id];
        if (cart.basicComponent.htmlElement)
          this.basicComponent.htmlElement?.removeChild(cart.basicComponent.htmlElement);
        const basket = cartState.getCart();
        if (basket) {
          basketModel.removeItemFromCart({ lineItemId: prod.id, version: basket.version });
        }
      });
      cart.mount();
      if (this.productCarts) this.productCarts[cart.id] = cart;
      return cart.basicComponent.htmlElement as HTMLElement;
    });
  }
}
