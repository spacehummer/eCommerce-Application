import { EventType } from './types';
import StateEvent from './StateEvent';

export default class StateEventTarget extends EventTarget {
  public emit(type: EventType, stateObject?: unknown): void {
    this.dispatchEvent(new StateEvent(type, stateObject));
  }

  public addEventListener(type: EventType, callback: EventListenerOrEventListenerObject): void {
    super.addEventListener(type, callback);
  }

  public removeEventListener(type: EventType, callback: EventListenerOrEventListenerObject): void {
    super.removeEventListener(type, callback);
  }
}
