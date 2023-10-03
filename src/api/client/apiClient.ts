import {
  Middleware,
  Client,
  ClientBuilder,
  Credentials,
  HttpMiddlewareOptions,
  UserAuthOptions,
} from '@commercetools/sdk-client-v2';
import { ApiRoot, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import getAuthMiddleware from '../utils/authMiddleware';
import APICredentials from '../utils/apiCredentials';

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: APICredentials.CTP_API_URL,
  fetch,
};

interface Options {
  projectKey?: string;
  oauthUri?: string;
  baseUri?: string;
  credentials?: Credentials;
}

class ApiClient {
  private projectKey: string;

  private oauthUri: string;

  private baseUri: string;

  private credentials: Credentials;

  constructor({ projectKey, oauthUri, baseUri, credentials }: Options) {
    if (projectKey) this.projectKey = projectKey;
    else this.projectKey = APICredentials.CTP_PROJECT_KEY;
    if (oauthUri) this.oauthUri = oauthUri;
    else this.oauthUri = APICredentials.CTP_AUTH_URL;
    if (baseUri) this.baseUri = baseUri;
    else this.baseUri = APICredentials.CTP_API_URL;
    if (credentials) this.credentials = credentials;
    else
      this.credentials = {
        clientId: APICredentials.CTP_CLIENT_ID,
        clientSecret: APICredentials.CTP_CLIENT_SECRET,
      };
  }

  public getDefaultClient(): Client {
    return new ClientBuilder()
      .defaultClient(this.baseUri, this.credentials, this.oauthUri, this.projectKey)
      .build();
  }

  public getClient(credentials?: UserAuthOptions): Client {
    const authMiddleware: Middleware = getAuthMiddleware(credentials);
    if (credentials) {
      return new ClientBuilder()
        .withProjectKey(this.projectKey)
        .withMiddleware(authMiddleware)
        .withHttpMiddleware(httpMiddlewareOptions)
        .withLoggerMiddleware()
        .build();
    }

    return new ClientBuilder()
      .withProjectKey(this.projectKey)
      .withMiddleware(authMiddleware)
      .withHttpMiddleware(httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();
  }

  public getProjectKey(): string {
    return this.projectKey;
  }

  public getApiRoot(client: Client): ApiRoot {
    return createApiBuilderFromCtpClient(client);
  }
}

export default ApiClient;
