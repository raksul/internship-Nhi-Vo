module.exports = {
  verbose: true,
  testURL: "http://localhost/",
  rootDir: ".",
  roots: ["<rootDir>/src/test/"],
  moduleFileExtensions: ["js", "ts", "json", "vue"],
  transform: {
    "^.+\\.ts$": "<rootDir>/node_modules/ts-jest",
    "^.+\\.vue$": "<rootDir>/node_modules/@vue/vue3-jest",
  },
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.json",
    },
  },
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  testEnvironment: "jsdom",
  snapshotSerializers: ["jest-serializer-vue"],
};
