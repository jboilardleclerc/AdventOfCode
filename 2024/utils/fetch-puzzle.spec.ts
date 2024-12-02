import { beforeAll, describe, it, vi, expect, afterAll } from "vitest";
import { http, HttpHandler, HttpResponse } from "msw";
import { setupServer, SetupServerApi } from "msw/node";
import { basePath, fetchPuzzle } from "./fetch-puzzle";
import { fs, vol } from "memfs";
import { resolve } from "path";

describe("fetch-puzzle", () => {
  vi.mock("node:fs", async () => {
    const memfs = await vi.importActual("memfs");
    return { default: memfs.fs, ...(memfs.fs as unknown as object) };
  });
  const expectedInstructionFileContents = [
    "<h2>These are today's instructions</h2>",
    "<p>instructions</p>",
  ];
  const expectedInputFileContents = ["input"];
  let httpRequestHandlers: Record<string, HttpHandler> ;
  let server: SetupServerApi;

  beforeAll(() => {
    vol.fromNestedJSON({
      [resolve(__dirname, "../")]: {
        src: {},
      },
    });
    vi.stubEnv("AOC_BASE_URL", "https://aoc.web");
    vi.stubEnv("AOC_SESSION_TOKEN", "session_token");
    httpRequestHandlers = {
      instructionsHandler: http.get(
        `${process.env.AOC_BASE_URL}/2024/day/1`,
        () => {
          return HttpResponse.html(`
          <article>
              ${expectedInstructionFileContents.join("\n")}
          </article>`);
        }
      ),
      inputHandler: http.get(
        `${process.env.AOC_BASE_URL}/2024/day/1/input`,
        () => {
          return HttpResponse.text(`${expectedInputFileContents.join("\n")}`);
        }
      ),
    };
  
    server = setupServer(...Object.values(httpRequestHandlers));
    server.listen();
  });

  afterAll(() => server.close());

  it("should fetch the instructions and input from the AOC website", async () => {
    await fetchPuzzle("2024", "1");
    expect(httpRequestHandlers.instructionsHandler.isUsed).toBe(true);
    expect(httpRequestHandlers.inputHandler.isUsed).toBe(true);
  });

  it('creates a directory named "day_1" in the src directory', async () => {
    await fetchPuzzle("2024", "1");
    expect(fs.existsSync(`${basePath}/day_1`)).toBe(true);
  });

  it("should save the instructions in the day's directory", async () => {
    vol.fromNestedJSON({
      [__dirname]: {
        src: {
          ["day_1"]: {},
        },
      },
    });
    await fetchPuzzle("2024", "1");
    const instructionsFileContents = fs
      .readFileSync(`${basePath}/day_1/instructions.md`)
      .toString();
    expectedInstructionFileContents.forEach((expectedInstruction) => {
      expect(instructionsFileContents).toContain(expectedInstruction);
    });
  });

  it("should save the instructions and input in the day's directory", async () => {
    await fetchPuzzle("2024", "1");
    const instructionsFileContents = fs
      .readFileSync(`${basePath}/day_1/instructions.md`)
      .toString();
    const inputFileContents = fs
      .readFileSync(`${basePath}/day_1/input.txt`)
      .toString();
    expectedInstructionFileContents.forEach((expectedInstruction) => {
      expect(instructionsFileContents).toContain(expectedInstruction);
    });
    expectedInputFileContents.forEach((expectedInput) => {
      expect(inputFileContents).toContain(expectedInput);
    });
  });
});
