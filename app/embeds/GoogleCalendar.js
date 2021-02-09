// @flow
import * as React from 'react';
import Frame from './components/Frame';

const URL_REGEX = new RegExp(
  '^https?://calendar.google.com/calendar/embed(.*)$'
);

type Props = {
  url: string,
};

export default class GoogleCalendar extends React.Component<Props> {
  static ENABLED = [URL_REGEX];

  render() {
    return <Frame src={this.props.url} title="Google Calendar Embed" />;
  }
}
