// @flow
import * as React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Grid from 'styled-components-grid';
import AuthNotices from './components/AuthNotices';
import Hero from './components/Hero';
import HeroText from './components/HeroText';
import SigninButtons from './components/SigninButtons';
import Branding from '../../shared/components/Branding';
import { githubUrl } from '../../shared/utils/routeHelpers';

type Props = {
  notice?: 'google-hd' | 'auth-error' | 'hd-not-allowed',
  lastSignedIn: string,
  googleSigninEnabled: boolean,
  slackSigninEnabled: boolean,
  auth0SigninEnabled: boolean,
};

function Home(props: Props) {
  return (
    <span>
      <Helmet>
        <title>Bed-Stuy Strong Member Hub</title>
      </Helmet>
      <Grid>
        <Hero id="signin">
          <AuthNotices notice={props.notice} />
          {process.env.TEAM_LOGO && (
            <Logo src={process.env.TEAM_LOGO} alt="Bed-Stuy Strong" />
          )}
          <Heading>Bed-Stuy Strong Member Hub</Heading>
          <HeroText>
            This is a space for BSS members to share key information on
            projects, events, and our network as a whole. To access this space,
            you must be a registered BSS member.
          </HeroText>
          <p>
            <SigninButtons {...props} />
          </p>
          <HeroText>
            Not a member yet? Sign up at{' '}
            <a href="https://bedstuystrong.com/membership">
              bedstuystrong.com/membership
            </a>
            .<br /> Please note, membership is limited to the Central Brooklyn
            community.
          </HeroText>
          <HeroText>
            Having trouble signing in? Any questions? Contact us at{' '}
            <a href="mailto:bedstuystrong@bedstuystrong.com">
              bedstuystrong@bedstuystrong.com
            </a>
            .
          </HeroText>
        </Hero>
      </Grid>
      <Branding href={githubUrl()} />
    </span>
  );
}

const Logo = styled.img`
  height: 100px;
  border-radius: 4px;
  margin-bottom: 1em;
`;

const Heading = styled.h1`
  ${Hero} & {
    font-size: 2.5em;
  }
`;

export default Home;
