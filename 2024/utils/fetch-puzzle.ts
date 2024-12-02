import axios, { AxiosInstance } from "axios";
import * as cheerio from "cheerio";
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { config } from "dotenv";
import { parseArgs } from "node:util";
import * as path from "path";

config();

export const basePath = path.resolve(__dirname, "../src");

const getAxios = (): AxiosInstance => {
  return axios.create({
    baseURL: process.env.AOC_BASE_URL,
    headers: {
      Cookie: `session=${process.env.AOC_SESSION_TOKEN}`,
    },
  });
};

export const fetchPuzzle = async (year: string, day: string) => {
  const axiosInstance = getAxios();
  const [instructionsData, inputData] = await Promise.all([
    axiosInstance.get(`/${year}/day/${day}`),
    axiosInstance.get(`${year}/day/${day}/input`),
  ]).then((responses) => responses.map((response) => response.data));
  const instructions = cheerio.load(instructionsData);
  if (!existsSync(`${basePath}/day_${day}`)) {
    mkdirSync(`${basePath}/day_${day}`);
  }
  instructions("article").each((index, element) => {
    writeFileSync(
      `${basePath}/day_${day}/instructions.md`,
      instructions(element).html() ?? "",
      {
        encoding: "utf-8",
        flag: "w+",
      }
    );
  });
  writeFileSync(`${basePath}/day_${day}/input.txt`, inputData, {
    encoding: "utf-8",
    flag: "w+",
  });
  writeFileSync(`${basePath}/day_${day}/solution.ts`, "", {
    encoding: "utf-8",
    flag: "w+",
  });
  writeFileSync(`${basePath}/day_${day}/solution.spec.ts`, "", {
    encoding: "utf-8",
    flag: "w+",
  });
};

if (require.main === module) {
  const {
    values: { year, day },
  } = parseArgs({
    args: process.argv.slice(2),
    options: {
      year: { type: "string", short: "y" },
      day: { type: "string", short: "d" },
    },
  });
  if (!year || !day) {
    throw new Error("Year and day are required");
  }
  fetchPuzzle(year, day);
}
