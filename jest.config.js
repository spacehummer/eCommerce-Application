/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  rootDir: './',
  roots: ['<rootDir>/src/', '<rootDir>/tests/'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
  verbose: true,
};

module.exports = config;
