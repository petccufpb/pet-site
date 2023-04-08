import type { Config } from "jest";

const config: Config = {
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "coverage",
  moduleFileExtensions: ["js", "json", "ts"],
  preset: "ts-jest",
  rootDir: "src",
  testEnvironment: "node",
  testRegex: ".*\\.spec\\.ts$",
};

export default config;
