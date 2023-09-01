import { Customer } from '@commercetools/platform-sdk';
import Api from '#src/api/api';
import { EventType, Profile } from './types';
import StateEvent from './StateEvent';

class StateEventTarget extends EventTarget {
  public emit(type: EventType, profile?: Profile): void {
    this.dispatchEvent(new StateEvent(type, profile));
  }

  public addEventListener(type: EventType, callback: EventListenerOrEventListenerObject): void {
    super.addEventListener(type, callback);
  }

  public removeEventListener(type: EventType, callback: EventListenerOrEventListenerObject): void {
    super.removeEventListener(type, callback);
  }
}

const eventTarget = new StateEventTarget();
let isLogin: boolean = false;
let profile: Profile;

export const getProfile = (): Profile | undefined => {
  if (isLogin) return profile;
  return undefined;
};

export const setProfile = (user: Customer): void => {
  isLogin = true;
  profile = user as Profile;
};

export const isDefaultAddress = (id: string): boolean =>
  profile && (id === profile.defaultShippingAddressId || id === profile.defaultBillingAddressId);

export const isAuthorised = (): boolean => isLogin;

export const logout = (): void => {
  isLogin = false;
  const api = new Api();
  api.logout();
};

export const addEventListener = (
  type: EventType,
  callback: EventListenerOrEventListenerObject
): void => eventTarget.addEventListener(type, callback);

export const removeEventListener = (
  type: EventType,
  callback: EventListenerOrEventListenerObject
): void => eventTarget.removeEventListener(type, callback);
