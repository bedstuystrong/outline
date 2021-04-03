// @flow
import passport from "@outlinewiki/koa-passport";
import Router from "koa-router";
import Auth0Strategy from "passport-auth0";
import accountProvisioner from "../../commands/accountProvisioner";
import env from "../../env";
import auth from "../../middlewares/authentication";
import passportMiddleware from "../../middlewares/passport";
import { StateStore } from "../../utils/passport";

const router = new Router();
const providerName = "auth0";
const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
const AUTH0_TEAM_NAME = process.env.AUTH0_TEAM_NAME;
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET;
const scopes = ["openid", "email", "profile"];

export const config = {
  name: "Auth0",
  enabled: !!AUTH0_CLIENT_ID,
};

if (AUTH0_CLIENT_ID) {
  passport.use(
    new Auth0Strategy(
      {
        domain: AUTH0_DOMAIN,
        clientID: AUTH0_CLIENT_ID,
        clientSecret: AUTH0_CLIENT_SECRET,
        callbackURL: `${env.URL}/auth/auth0.callback`,
        passReqToCallback: true,
        store: new StateStore(),
        scope: scopes,
        state: false,
      },
      async function (req, accessToken, refreshToken, profile, done) {
        try {
          const subdomain = AUTH0_DOMAIN.split(".")[0];

          const result = await accountProvisioner({
            ip: req.ip,
            team: {
              name: AUTH0_TEAM_NAME,
              subdomain,
            },
            user: {
              name: profile.displayName,
              email: profile.emails[0].value,
              avatarUrl: profile.picture,
            },
            authenticationProvider: {
              name: providerName,
              providerId: AUTH0_DOMAIN,
            },
            authentication: {
              providerId: profile.id,
              accessToken,
              refreshToken,
              scopes,
            },
          });
          return done(null, result.user, result);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );

  router.get("auth0", passport.authenticate(providerName));

  router.get(
    "auth0.callback",
    auth({ required: false }),
    passportMiddleware(providerName)
  );
}

export default router;
