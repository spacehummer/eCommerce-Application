# BookSavior

<p align="center">
  <img src="./assets/icons/logo.svg" width="120" alt="BookSavior Logo" />
</p>

## Description

This project is a solution to the task [eCommerce Application](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/eCommerce-Application/Readme.md) for the JavaScript/Front-end course of the <a href="https://rs.school/js/">RSSchool</a>.
This solution is a platform that brings together people who want to buy new or sell books that they no longer need. On this platform, you can buy books and related products from the list of available ones. Also post your books for sale.

## Purpose

**BookSavior** - is a service for preserving cultural heritage in its original form. We believe that it is important to give books a second life. That's why we accept any books and printed publications from people who no longer need them and give people who are looking for a particular book the opportunity to finally get it into their library.

## Technology stack

- Project management [YouTrack](https://russianspacehummer.youtrack.cloud/agiles/121-11/)
- Project backend and API client [CommerceTools](https://commercetools.com/) 
- Module bundler [WebPack](https://github.com/webpack/webpack)
- Programming language [TypeScript](https://www.typescriptlang.org/)
- Code analysis [ESLint](https://eslint.org/)
- Code formatter [Prettier](https://prettier.io/)
- Git hooks [Husky](https://github.com/typicode/husky)
- [Jest](https://jestjs.io/) for testing
- The application is a Single Page Application (SPA).

# Start guide

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## [Commerce Tools Set Up🔗](./instructions/create-API.md)

## Downloading project

```
git clone https://github.com/spacehummer/eCommerce-Application.git
```

## Installing

- install node modules
```
npm install
```

- install Husky
```
npm run husky:prepare
```

## CLI Commands

- Run application in `watch` mode
```
npm run watch
```

- Run application on webpack dev server in `prod` mode
```
npm run server-prod
```

- Run application on webpack dev server in `dev` mode
```
npm run server-dev
```

- Build application bundle in `prod` mode
```
npm run build-prod
```

- Build application bundle  in `dev` mode
```
npm run build-dev
```

- Run linter for code check
```
npm run lint
```

- Run linter for code check with `--fix` flag
```
npm run lint:fix
```

- Run prettier for code check
```
npm run prettier
```

- Run prettier for format all files
```
npm run prettier:fix
```

- To run all unit tests
```
npm run test
```