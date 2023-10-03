import StateEvent from './StateEvent';
import { EventType, Profile } from './types';

export default class ProfileEvent extends StateEvent {
  constructor(protected readonly eventType: EventType, protected readonly profile?: Profile) {
    super(eventType, profile);
  }
}
