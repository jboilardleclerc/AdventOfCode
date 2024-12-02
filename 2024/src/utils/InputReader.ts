import { readFileSync } from "node:fs";

export class InputReader {
  private readonly input: string;
  constructor(input: string) {
    this.input = input;
  }
  readColumns(): string[][] {
    const lines = readFileSync(this.input, "utf-8")
      .split("\n")
      .filter((line) => line !== "")
      .map((line) => line.trim().split(/\s+/));
    const columns: string[][] = [];
    for (let i = 0; i < lines[0].length; i++) {
      columns[i] = [];
      for (let j = 0; j < lines.length; j++) {
        columns[i].push(lines[j][i]);
      }
    }
    return columns;
  }
}
