export default () => {
  const rawTimeZone = new Date().toTimeString().split(" ")[1];
  const offsetSign = rawTimeZone.substring(3, 4);
  const offsetHour = rawTimeZone.substring(4, 6);
  const offsetMinutes = rawTimeZone.substring(6);

  return offsetSign + offsetHour + ":" + offsetMinutes;
};
