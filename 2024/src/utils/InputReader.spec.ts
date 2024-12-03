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
          "lines.txt": `1 9\n2 8`,
          "raw.txt": `this is some raw text
  With multiple lines`,
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

  it("should read the input file as lines and return the values in arrays", () => {
    const inputReader = new InputReader(`${__dirname}/files/lines.txt`);
    const lines = inputReader.readLines();
    expect(lines).toEqual([
      ["1", "9"],
      ["2", "8"],
    ]);
  });

  it("should return the raw content of the file", () => {
    const inputReader = new InputReader(`${__dirname}/files/raw.txt`);
    const lines = inputReader.readRaw();
    expect(lines).toEqual(`this is some raw text
  With multiple lines`);
  });
});
