import { InputReader } from "../utils/InputReader";

export const solution = () => {
  const inputData = new InputReader(`${__dirname}/input.txt`).readColumns();
  const orderedColumns = inputData.map((column) =>
    column.map((value) => Number(value)).sort()
  );
  return orderedColumns[0]
    .map((column, index) => Math.abs(column - orderedColumns[1][index]))
    .reduce((acc, curr) => acc + curr, 0);
};

if (require.main === module) {
  console.log("solution is: ", solution());
}
