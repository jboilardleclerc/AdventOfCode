import { describe, it, expect, vi, beforeAll } from "vitest";
import { vol } from "memfs";
import { InputReader } from "./InputReader";

describe("InputReader", () => {
  beforeAll(() => {
    vi.mock("node:fs", async () => {
      const memfs = await vi.importActual("memfs");
      return { default: memfs.fs, ...(memfs.fs as unknown as object) };
    });
    vol.fromNestedJSON({
      [__dirname]: {
        files: {
          "columns.txt": `1 2\n3    4\n`,
        },
      },
    });
  });

  it("should read the input file as columns and return them as arrays", () => {
    const inputReader = new InputReader(`${__dirname}/files/columns.txt`);
    const columns = inputReader.readColumns();
    expect(columns).toEqual([
      ["1", "3"],
      ["2", "4"],
    ]);
  });
});
