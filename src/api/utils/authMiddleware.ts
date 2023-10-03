import {
  createAuthForPasswordFlow,
  createAuthForAnonymousSessionFlow,
  Middleware,
  UserAuthOptions,
  AuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import APICredentials from './apiCredentials';

const anonymousMidlewareOptions: AuthMiddlewareOptions = {
  host: APICredentials.CTP_AUTH_URL,
  projectKey: APICredentials.CTP_PROJECT_KEY,
  credentials: {
    clientId: APICredentials.CTP_CLIENT_ID,
    clientSecret: APICredentials.CTP_CLIENT_SECRET,
  },
  fetch,
};

export default function getAuthMiddleware(credentials?: UserAuthOptions): Middleware {
  if (credentials) {
    return createAuthForPasswordFlow({
      host: APICredentials.CTP_AUTH_URL,
      projectKey: APICredentials.CTP_PROJECT_KEY,
      credentials: {
        clientId: APICredentials.CTP_CLIENT_ID,
        clientSecret: APICredentials.CTP_CLIENT_SECRET,
        user: credentials,
      },
      fetch,
    });
  }
  return createAuthForAnonymousSessionFlow(anonymousMidlewareOptions);
}
