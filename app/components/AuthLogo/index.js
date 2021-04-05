// @flow
import * as React from "react";
import OutlineLogo from "../OutlineLogo";
import SlackLogo from "../SlackLogo";
import GoogleLogo from "./GoogleLogo";

type Props = {|
  providerName: string,
|};

export default function AuthLogo({ providerName }: Props) {
  switch (providerName) {
    case "slack":
      return <SlackLogo size={16} />;
    case "google":
      return <GoogleLogo size={16} />;
    case "auth0":
      return <OutlineLogo size={16} />;
    default:
      return null;
  }
}
