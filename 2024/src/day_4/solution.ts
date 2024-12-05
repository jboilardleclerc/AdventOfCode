import { InputReader } from "../utils/InputReader";

export const solution = () => {
  let count = 0;
  const input = new InputReader(`${__dirname}/input.txt`).readLines();
  for (let i = 0; i < input.length; i++) {
    const word = input[i][0];
    for (let j = 0; j < word.length; j++) {
      // Linear forward
      if (`${word[j]}${word[j + 1]}${word[j + 2]}${word[j + 3]}` === "XMAS") {
        count++;
      }
      // Linear forward
      if (`${word[j + 3]}${word[j + 2]}${word[j + 1]}${word[j]}` === "XMAS") {
        count++;
      }

      // Diagonal from the end
      // - - - X
      // - - M -
      // - A - -
      // S - - -
      if (
        `${input[i]?.[0][j + 3]}${input[i + 1]?.[0][j + 2]}${input[i + 2]?.[0][j + 1]}${input[i + 3]?.[0][j]}` ===
        "XMAS"
      ) {
        count++;
      }
      // Diagonal from the the end reversed
      // - - - S
      // - - A -
      // - M - -
      // X - - -
      if (
        `${input[i + 3]?.[0][j]}${input[i + 2]?.[0][j + 1]}${input[i + 1]?.[0][j + 2]}${input[i]?.[0][j + 3]}` ===
        "XMAS"
      ) {
        count++;
      }

      // Diagonal from the start
      // X - - -
      // - M - -
      // - - A -
      // - - - S
      if (
        `${input[i]?.[0][j]}${input[i + 1]?.[0][j + 1]}${input[i + 2]?.[0][j + 2]}${input[i + 3]?.[0][j + 3]}` ===
        "XMAS"
      ) {
        count++;
      }
      // Diagonal from the start reversed
      // S - - -
      // - A - -
      // - - M -
      // - - - X
      if (
        `${input[i + 3]?.[0][j + 3]}${input[i + 2]?.[0][j + 2]}${input[i + 1]?.[0][j + 1]}${input[i]?.[0][j]}` ===
        "XMAS"
      ) {
        count++;
      }

      if (
        `${input[i]?.[0][j]}${input[i + 1]?.[0][j]}${input[i + 2]?.[0][j]}${input[i + 3]?.[0][j]}` ===
        "XMAS"
      ) {
        count++;
      }
      if (
        `${input[i + 3]?.[0][j]}${input[i + 2]?.[0][j]}${input[i + 1]?.[0][j]}${input[i]?.[0][j]}` ===
        "XMAS"
      ) {
        count++;
      }
    }
  }
  return count;
};

if (require.main === module) {
  console.log("solution is: ", solution());
  //console.log("solution2 is: ", solution2());
}
