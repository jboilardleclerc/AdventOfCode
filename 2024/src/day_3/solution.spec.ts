import { describe, it, expect, vi, beforeAll } from "vitest";
import { vol } from "memfs";
import { solution, solution2 } from "./solution";

const mockInputFile = (input: string) => {
  vol.fromNestedJSON({
    [__dirname]: {
      "input.txt": input,
    },
  });
};
describe("day_3 with test input", () => {
  beforeAll(() => {
    vi.mock("node:fs", async () => {
      const memfs = await vi.importActual("memfs");
      return { default: memfs.fs, ...(memfs.fs as unknown as object) };
    });
  });
  it("should return the answer", () => {
    mockInputFile(
      "mul(2,4)</em>%&amp;mul[3,7]!@^do_not_<em>mul(5,5)</em>+mul(32,64]then(<em>mul(11,8)mul(8,5)"
    );
    expect(solution()).toBe(161);
  });
  it("should return the answer for part 2", () => {
    mockInputFile(
      "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"
    );
    expect(solution2()).toBe(48);
  });
});
