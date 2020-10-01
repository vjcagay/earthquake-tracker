import padString from "./padString";

export default (date: Date) => {
  return `${date.getFullYear()}-${padString((date.getMonth() + 1).toString())}-${padString(date.getDate().toString())}`;
};
