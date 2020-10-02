import getTimeZone from "../getTimeZone";

describe("getTimeZone", () => {
  test("Should get timezone in -/+HH:00 format", () => {
    const rawTimeZone = new Date().toTimeString().split(" ")[1];
    const offsetSign = rawTimeZone.substring(3, 4);
    const offsetHour = rawTimeZone.substring(4, 6);
    const offsetMinutes = rawTimeZone.substring(6);

    expect(getTimeZone()).toEqual(offsetSign + offsetHour + ":" + offsetMinutes);
  });
});
