import type { Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";

import { compilerOptions } from "./tsconfig.json";

const config: Config = {
  cache: true,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["src/modules/**/services/*.(j|t)s"],
  coverageDirectory: "coverage",
  coverageReporters: ["text-summary", "lcov"],
  moduleFileExtensions: ["js", "json", "ts"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/src/" }),
  passWithNoTests: true,
  preset: "ts-jest",
  testEnvironment: "node",
  testRegex: ".*\\.spec\\.ts$",
};

export default config;
