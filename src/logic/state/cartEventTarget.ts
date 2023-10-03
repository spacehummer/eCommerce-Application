import { Cart } from '@commercetools/platform-sdk';
import { EventType } from './types';
import StateEventTarget from './StateEventTarget';
import CartEvent from './cartStateEvent';

export default class CartEventTarget extends StateEventTarget {
  public emit(type: EventType, cart?: Cart): void {
    this.dispatchEvent(new CartEvent(type, cart));
  }
}
