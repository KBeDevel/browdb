/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  collectCoverageFrom: [
    '**/*.ts',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/index.ts'
  ],
  coverageDirectory: '<rootDir>/coverage',
  preset: 'ts-jest',
  rootDir: './',
  testEnvironment: 'jsdom',
  testMatch: [
    '**/tests/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)'
  ]
}
