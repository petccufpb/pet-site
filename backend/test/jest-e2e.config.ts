import type { Config } from "jest";

const config: Config = {
  moduleFileExtensions: ["js", "json", "ts"],
  preset: "ts-jest",
  rootDir: ".",
  testEnvironment: "node",
  testRegex: ".e2e-spec.ts$",
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
