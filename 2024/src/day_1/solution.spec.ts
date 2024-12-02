import { describe, it, expect, beforeAll, vi } from "vitest";
import { vol } from "memfs";
import { solution } from "./solution";

describe("day_1 with test input", () => {
  beforeAll(() => {
    vi.mock("node:fs", async () => {
      const memfs = await vi.importActual("memfs");
      return { default: memfs.fs, ...(memfs.fs as unknown as object) };
    });
    vol.fromNestedJSON({
      [__dirname]: {
        "input.txt": `3   4
4   3
2   5
1   3
3   9
3   3`,
      },
    });
  });
  it("should compute the total distance between the columns of the input", () => {
    expect(solution()).toBe(11);
  });
});
