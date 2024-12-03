import { InputReader } from "../utils/InputReader";

export const solution = () => {
  const memory = new InputReader(`${__dirname}/input.txt`).readRaw();
  const regex = /mul\((\d{1,3}),(\d{1,3})\)/gm;
  let match;
  let result = 0;
  while ((match = regex.exec(memory))) {
    result += Number(match[1]) * Number(match[2]);
  }
  return result;
};

export const solution2 = () => {
  const memory = new InputReader(`${__dirname}/input.txt`).readRaw();
  const regex = /mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/gm;
  let match;
  let result = 0;
  let enabled = true;
  while ((match = regex.exec(memory))) {
    if (match[0] === "do()") {
      enabled = true;
    } else if (match[0] === "don't()") {
      enabled = false;
    } else if (enabled) {
      result += Number(match[1]) * Number(match[2]);
    }
  }
  return result;
};

if (require.main === module) {
  console.log("solution is: ", solution());
  console.log("solution2 is: ", solution2());
}
