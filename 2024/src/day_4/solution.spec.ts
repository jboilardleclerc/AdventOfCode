import { vol } from "memfs";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { mockInputFile } from "../test/utils";
import { solution } from "./solution";

describe("day_4", () => {
  beforeAll(() => {
    vi.mock("node:fs", async () => {
      const memfs = await vi.importActual("memfs");
      return { default: memfs.fs, ...(memfs.fs as unknown as object) };
    });
    vol.fromNestedJSON({
      [__dirname]: {
        "input.txt": `MMMSXXMASM
                      MSAMXMSMSA
                      AMXSXMAAMM
                      MSAMASMSMX
                      XMASAMXAMM
                      XXAMMXXAMA
                      SMSMSASXSS
                      SAXAMASAAA
                      MAMMMXMMMM
                      MXMXAXMASX`,
      },
    });
  });

  it("should find the words", () => {
    expect(solution()).toBe(18);
  });
});
