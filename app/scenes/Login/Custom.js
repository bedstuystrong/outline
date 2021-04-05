// @flow
import { observer } from "mobx-react";
import { BackIcon, EmailIcon } from "outline-icons";
import * as React from "react";
import { Redirect, type Location } from "react-router-dom";
import styled from "styled-components";
import getQueryVariable from "shared/utils/getQueryVariable";
import ButtonLarge from "components/ButtonLarge";
import Fade from "components/Fade";
import Flex from "components/Flex";
import Heading from "components/Heading";
import HelpText from "components/HelpText";
import OutlineLogo from "components/OutlineLogo";
import PageTitle from "components/PageTitle";
import TeamLogo from "components/TeamLogo";
import Notices from "./Notices";
import Provider from "./Provider";
import env from "env";
import useStores from "hooks/useStores";

type Props = {|
  location: Location,
|};

function CustomLogin({ location }: Props) {
  const { auth } = useStores();
  const { config } = auth;
  const [emailLinkSentTo, setEmailLinkSentTo] = React.useState("");

  const handleReset = React.useCallback(() => {
    setEmailLinkSentTo("");
  }, []);

  const handleEmailSuccess = React.useCallback((email) => {
    setEmailLinkSentTo(email);
  }, []);

  React.useEffect(() => {
    auth.fetchConfig();
  }, [auth]);

  if (auth.authenticated) {
    return <Redirect to="/home" />;
  }

  // we're counting on the config request being fast
  if (!config) {
    return null;
  }

  const header =
    env.DEPLOYMENT === "hosted" &&
    (config.hostname ? (
      <Back href={env.URL}>
        <BackIcon color="currentColor" /> Back to home
      </Back>
    ) : (
      <Back href="https://www.getoutline.com">
        <BackIcon color="currentColor" /> Back to website
      </Back>
    ));

  if (emailLinkSentTo) {
    return (
      <Background>
        {header}
        <Content align="flex-start" justify="center" column auto>
          <PageTitle title="Check your email" />
          <CheckEmailIcon size={38} color="currentColor" />

          <Heading centered>Check your email</Heading>
          <Note>
            A magic sign-in link has been sent to the email{" "}
            <em>{emailLinkSentTo}</em>, no password needed.
          </Note>
          <br />
          <ButtonLarge onClick={handleReset} fullwidth neutral>
            Back to login
          </ButtonLarge>
        </Content>
      </Background>
    );
  }

  return (
    <Background>
      {header}
      <Content align="flex-start" justify="center" column auto>
        <PageTitle title="Login" />
        <Logo>
          {env.TEAM_LOGO && env.DEPLOYMENT !== "hosted" ? (
            <TeamLogo src={env.TEAM_LOGO} />
          ) : (
            <OutlineLogo size={38} fill="currentColor" />
          )}
        </Logo>

        <Heading centered>Bed-Stuy Strong Member Hub</Heading>

        <Text>
          This is a space for BSS members to share key information on projects,
          events, and our network as a whole. To access this space, you must be
          a registered BSS member.
        </Text>
        <br />

        <Notices notice={getQueryVariable("notice")} />

        {config.providers.map((provider) => {
          return (
            <Provider
              key={provider.id}
              isCreate={false}
              onEmailSuccess={handleEmailSuccess}
              {...provider}
            />
          );
        })}

        <br />
        <Note>
          Not a member yet? Sign up at{" "}
          <a href="https://bedstuystrong.com/membership">
            bedstuystrong.com/membership
          </a>
          . <br />
          Please note, membership is limited to the Central Brooklyn community.
        </Note>
        <Note>
          Having trouble signing in? Any questions? Contact us at{" "}
          <a href="mailto:bedstuystrong@bedstuystrong.com">
            bedstuystrong@bedstuystrong.com
          </a>
          .
        </Note>
      </Content>
    </Background>
  );
}

const CheckEmailIcon = styled(EmailIcon)`
  margin-bottom: -1.5em;
`;

const Background = styled(Fade)`
  width: 100vw;
  height: 100vh;
  background: ${(props) => props.theme.background};
  display: flex;
`;

const Logo = styled.div`
  margin-bottom: -1.5em;
  height: 100px;
`;

const Text = styled.p`
  margin-bottom: 1em;
`;

const Note = styled(HelpText)`
  font-size: 14px;

  em {
    font-style: normal;
    font-weight: 500;
  }
`;

const Back = styled.a`
  display: flex;
  align-items: center;
  color: inherit;
  padding: 32px;
  font-weight: 500;
  position: absolute;

  svg {
    transition: transform 100ms ease-in-out;
  }

  &:hover {
    svg {
      transform: translateX(-4px);
    }
  }
`;

const Content = styled(Flex)`
  width: 90vw;
  height: 100%;
  max-width: 36em;
  margin: 0 auto;
`;

export default observer(CustomLogin);
