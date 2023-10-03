import { EventType, Profile } from './types';
import ProfileEvent from './profileEvent';
import StateEventTarget from './StateEventTarget';

export default class ProfileEventTarget extends StateEventTarget {
  public emit(type: EventType, profile?: Profile): void {
    this.dispatchEvent(new ProfileEvent(type, profile));
  }
}
