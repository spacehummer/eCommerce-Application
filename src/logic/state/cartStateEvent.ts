import { Cart } from '@commercetools/platform-sdk';
import StateEvent from './StateEvent';
import { EventType } from './types';

export default class CartEvent extends StateEvent {
  constructor(protected readonly eventType: EventType, protected readonly cart?: Cart) {
    super(eventType, cart);
  }
}
