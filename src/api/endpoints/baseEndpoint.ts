import { ApiRoot } from '@commercetools/platform-sdk';
import AuthService from '../utils/authService';
import APICredentials from '../utils/apiCredentials';

class BaseEndpoint {
  protected get apiRoot(): ApiRoot {
    return this.auth.apiRoot;
  }

  protected get projectKey(): string {
    return APICredentials.CTP_PROJECT_KEY;
  }

  constructor(protected readonly auth: AuthService) {}
}

export default BaseEndpoint;
