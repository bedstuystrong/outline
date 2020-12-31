// @flow
import Router, { type Context } from 'koa-router';
import fetch from 'isomorphic-fetch';
import { mountOAuth2Passport, type DeserializedData } from '../utils/passport';
import { customError } from '../errors';

async function json(
  input: string | Request | URL,
  init?: RequestOptions
): Promise<any> {
  const res = await fetch(input, init);
  return await res.json();
}

async function handleAuthorizeFailed(ctx: Context, err: any) {
  throw err;
}

async function deserializeAuth0Token(
  accessToken,
  refreshToken: string
): Promise<DeserializedData> {
  const user = await json(`https://${process.env.AUTH0_DOMAIN}/userinfo`, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });

  console.log(user)

  return {
    _user: {
      id: user.sub,
      name: user.name,
      email: user.email,
      avatarUrl: user.picture,
    },
    _team: {
      id: 'bedstuystrong',
      name: 'Bed-Stuy Strong',
      avatarUrl: '',
    },
  };
}

const router = new Router();
if (
  process.env.AUTH0_CLIENT_ID &&
  process.env.AUTH0_CLIENT_SECRET &&
  process.env.AUTH0_DOMAIN
) {
  const [authorizeHandler, callbackHandlers] = mountOAuth2Passport(
    'auth0',
    deserializeAuth0Token,
    {
      clientID: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      tokenURL: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
      authorizationURL: `https://${process.env.AUTH0_DOMAIN}/authorize`,
      scope: ['openid', 'email', 'profile'],
      column: 'slackId',
      authorizeFailedHook: [handleAuthorizeFailed],
    }
  );

  router.get('auth0', authorizeHandler);
  router.get('auth0.callback', ...callbackHandlers);
}

export default router;
