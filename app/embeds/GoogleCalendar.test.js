/* eslint-disable flowtype/require-valid-file-annotation */
import GoogleCalendar from "./GoogleCalendar";

describe("GoogleCalendar", () => {
  const match = GoogleCalendar.ENABLED[0];
  test("to be enabled on share link", () => {
    expect(
      "https://calendar.google.com/calendar/embed?src=en.usa%23holiday%40group.v.calendar.google.com&ctz=America%2FNew_York".match(
        match
      )
    ).toBeTruthy();
  });

  test("to not be enabled elsewhere", () => {
    expect(
      "https://calendar.google.com/calendar/u/0/embed?src=en.usa%23holiday@group.v.calendar.google.com&ctz=America/New_York".match(
        match
      )
    ).toBe(null);
    expect("https://calendar.google.com/calendar".match(match)).toBe(null);
    expect("https://calendar.google.com".match(match)).toBe(null);
    expect("https://www.google.com".match(match)).toBe(null);
  });
});
