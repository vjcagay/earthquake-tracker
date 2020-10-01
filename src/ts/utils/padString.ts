export default (input: string, numberOfCharacters: number = 2, paddingCharacter: string = "0") => {
  return input.length >= numberOfCharacters || !input
    ? input
    : Array(numberOfCharacters - input.length + 1).join(paddingCharacter) + input;
};
