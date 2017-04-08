/**
  * Assumption: Return the original string if cannot compress the given string
  * This means if the returned string length is equal or bigger the original string length, it
  * will return the original string instead. For example, we can have this unwanted case
  * 'abcdefgh' -> 'a1b1c1d1e1f1g1h1', which is longer than the original string
  * @param {string} string original string to compress
  * @return {string}
  */
export default string => {
  if (typeof string !== "string") {
    throw new Error("Only accept string as its input");
  }

  const result = [];
  let previousChar;
  let counter;

  for (let char of string) {
    if (char === previousChar) {
      counter += 1;
    } else {
      if (previousChar) {
        result.push(counter.toString());
      }

      result.push(char);

      previousChar = char;
      counter = 1;
    }
  }

  result.push(counter.toString());

  const newString = result.join("");

  if (newString.length < string.length) {
    return newString;
  }

  return string;
};
