import dateToISO from "../dateToISO";

describe("dateToISO", () => {
  test("Should convert Date object to YYYY-MM-DD correctly", () => {
    const date = new Date("Jan 1 2020 00:00:00 GMT+0000");

    const result = dateToISO(date);

    expect(result).toEqual("2020-01-01");
  });

  test("Should convert Date object from YYYY-MM-DD string in GTM to YYYY-MM-DD correctly", () => {
    const date = new Date("Feb 14 1995 GMT+0000");

    const result = dateToISO(date);

    expect(result).toEqual("1995-02-14");
  });
});
