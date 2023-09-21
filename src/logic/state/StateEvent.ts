import { EventType } from './types';

export default class StateEvent extends Event {
  constructor(protected readonly eventType: EventType, protected readonly stateObj?: unknown) {
    super(eventType);
  }
}
