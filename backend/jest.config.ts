import type { Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";

import { compilerOptions } from "./tsconfig.json";

const config: Config = {
  cache: true,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "!src/*.(js|ts)",
    "!src/database/*.(js|ts)",
    "!src/decorators/*.(js|ts)",
    "!src/modules/*/*.(js|ts)",
    "!src/modules/**/dtos/*.(js|ts)",
    "!src/modules/**/repositories/**/*.(js|ts)",
    "!src/modules/**/infra/http/controllers/*.(js|ts)",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text-summary", "lcov"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  moduleDirectories: ["node_modules", "src"],
  moduleFileExtensions: ["js", "json", "ts"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/src/" }),
  passWithNoTests: true,
  preset: "ts-jest",
  testEnvironment: "node",
  testRegex: ".*\\.(e2e-){0}spec\\.ts$",
  transform: {
    "^.+\\.(j|t)s$": [
      "ts-jest",
      {
        astTransformers: {
          before: ["./nestjs-swagger-transformer.js"],
        },
      },
    ],
  },
};

export default config;
