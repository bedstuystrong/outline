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
        <title>Outline - Team wiki & knowledge base</title>
      </Helmet>
      <Grid>
        <Hero id="signin">
          <AuthNotices notice={props.notice} />
          {process.env.TEAM_LOGO && <Logo src={process.env.TEAM_LOGO} />}
          <h1>Member Hub</h1>
          <HeroText>
            Team wiki, documentation, meeting notes, playbooks, onboarding, work
            logs, brainstorming, & more…
          </HeroText>
          <p>
            <SigninButtons {...props} />
          </p>
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

export default Home;
