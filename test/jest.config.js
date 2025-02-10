/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  //testMatch: ["<rootDir>/test/**/*.test.ts"],
  rootDir: "../",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
};