import { ApiRoot } from '@commercetools/platform-sdk';
import { UserAuthOptions } from '@commercetools/sdk-client-v2';
import ApiClient from '../client/apiClient';

export default class AuthService {
  private root: ApiRoot;

  private readonly provider: ApiClient;

  constructor() {
    this.provider = new ApiClient({});
    this.root = this.provider.getApiRoot(this.provider.getClient());
  }

  private setAnonymous(): void {
    this.root = this.provider.getApiRoot(this.provider.getClient());
  }

  public login(options: UserAuthOptions): void {
    this.root = this.provider.getApiRoot(this.provider.getClient(options));
  }

  public logout(): void {
    this.setAnonymous();
  }

  public get apiRoot(): ApiRoot {
    return this.root;
  }
}
