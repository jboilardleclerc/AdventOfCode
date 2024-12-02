import { InputReader } from "../utils/InputReader";

export const solution = () => {
  let valids = 0;
  const reports = new InputReader(`${__dirname}/input.txt`).readLines();
  reports.forEach((report) => {
    if (isReportSafe(report)) valids++;
  });
  return valids;
};

export const isReportSafe = (report: Array<string>): boolean => {
  const reportAsNumbers = report.map((value) => Number(value));
  let safe = true;
  const increasing = isIncreasing(reportAsNumbers[0], reportAsNumbers[1]);

  for (let i = 0; i < reportAsNumbers.length - 1; i++) {
    const a = reportAsNumbers[i];
    const b = reportAsNumbers[i + 1];
    if (increasing) {
      if (isDecreasing(a, b) || differsTooMuch(a, b)) {
        safe = false;
      }
    } else {
      if (isIncreasing(a, b) || differsTooMuch(a, b)) {
        safe = false;
      }
    }
  }
  return safe;
};

const isIncreasing = (a: number, b: number) => b > a;
const isDecreasing = (a: number, b: number) => !isIncreasing(a, b);
const differsTooMuch = (a: number, b: number) =>
  Math.abs(a - b) > 3 || Math.abs(a - b) === 0;

if (require.main === module) {
  console.log("solution is: ", solution());
}
