import padString from "../padString";

describe("padString", () => {
  test("Pad one zero to a single digit number", () => {
    expect(padString("1")).toEqual("01");
  });

  test("Pad three zeros to a single digit number", () => {
    expect(padString("1", 4)).toEqual("0001");
  });

  test("Use a custom padding character", () => {
    expect(padString("0", 4, "-")).toEqual("---0");
  });

  test("Return empty string if input is empty", () => {
    expect(padString("")).toEqual("");
  });
});
