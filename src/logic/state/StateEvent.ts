import { EventType, Profile } from './types';

export default class StateEvent extends Event {
  constructor(protected readonly eventType: EventType, protected readonly profile?: Profile) {
    super(eventType);
  }
}
