import { describe, it, expect, vi, beforeAll } from "vitest";
import { vol } from "memfs";
import { solution } from "./solution";
import { isReportSafe } from "./solution";

describe("day_1 with test input", () => {
  beforeAll(() => {
    vi.mock("node:fs", async () => {
      const memfs = await vi.importActual("memfs");
      return { default: memfs.fs, ...(memfs.fs as unknown as object) };
    });
    vol.fromNestedJSON({
      [__dirname]: {
        "input.txt": `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
      },
    });
  });

  describe("isReportSafe", () => {
    it("should correctly determine if a report is safe", () => {
      const reports = [
        { values: ["7", "6", "4", "2", "1"], expected: true },
        { values: ["1", "2", "7", "8", "9"], expected: false },
        { values: ["9", "7", "6", "2", "1"], expected: false },
        { values: ["1", "3", "2", "4", "5"], expected: false },
        { values: ["8", "6", "4", "4", "1"], expected: false },
        { values: ["1", "3", "6", "7", "9"], expected: true },
      ];
      reports.forEach((report) => {
        expect(isReportSafe(report.values), JSON.stringify(report.values)).toBe(
          report.expected
        );
      });
    });
  });

  describe("solution", () => {
    it("should return that only 2 reports are valid", () => {
      expect(solution()).toStrictEqual(2);
    });
  });
});
