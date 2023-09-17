import { Cart } from '@commercetools/platform-sdk';
import CartEventTarget from './cartEventTarget';
import CartEvent from './cartStateEvent';
import { EventType } from './types';

const eventTarget = new CartEventTarget();

let cart: Cart | undefined;

const getCart = (): Cart | undefined => cart;
const setCart = (newCart: Cart): void => {
  cart = newCart;
  eventTarget.emit('update', cart);
};

const addStateListener = (type: EventType, callback: (event: CartEvent) => void): void => {
  const wrappedCallback = (event: Event): void => {
    callback(event as CartEvent);
  };
  eventTarget.addEventListener(type, wrappedCallback);
};

const removeStateListener = (type: EventType, callback: EventListenerOrEventListenerObject): void =>
  eventTarget.removeEventListener(type, callback);

export default { getCart, setCart, addStateListener, removeStateListener };
