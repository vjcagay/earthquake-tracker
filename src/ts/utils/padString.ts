export default (input: string, numberOfCharacters = 2, paddingCharacter = "0"): string => {
  return input.length >= numberOfCharacters || !input
    ? input
    : Array(numberOfCharacters - input.length + 1).join(paddingCharacter) + input;
};
