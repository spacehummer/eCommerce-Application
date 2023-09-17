import { Customer } from '@commercetools/platform-sdk';
import Api from '#src/api/api';
import { EventType, Profile } from './types';
import StateEvent from './StateEvent';
import ProfileEventTarget from './ProfileEventTarget';

const eventTarget = new ProfileEventTarget();
let isLogin: boolean = false;
let profile: Profile;

export const getProfile = (): Profile | undefined => {
  if (isLogin) return profile;
  return undefined;
};

export const setProfile = (user: Customer): void => {
  profile = user as Profile;
  if (!isLogin) {
    isLogin = true;
    eventTarget.emit('login');
  } else {
    eventTarget.emit('update');
  }
};

export const isDefaultShippingAddress = (id: string): boolean =>
  profile && id === profile.defaultShippingAddressId;

export const isDefaultBillingAddress = (id: string): boolean =>
  profile && id === profile.defaultBillingAddressId;

export const isDefaultAddress = (id: string): boolean =>
  isDefaultShippingAddress(id) || isDefaultBillingAddress(id);

export const isAuthorised = (): boolean => isLogin;

export const logout = (): void => {
  isLogin = false;
  const api = new Api();
  api.logout();
  eventTarget.emit('logout');
};

export const addStateListener = (type: EventType, callback: (event: StateEvent) => void): void => {
  const wrappedCallback = (event: Event): void => {
    callback(event as StateEvent);
  };
  eventTarget.addEventListener(type, wrappedCallback);
};

export const removeStateListener = (
  type: EventType,
  callback: EventListenerOrEventListenerObject
): void => eventTarget.removeEventListener(type, callback);

export const getLang = (): string => 'en';
