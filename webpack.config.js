// ESLint rules per file start
/* eslint-disable no-console */
// ESLint rules per file end

console.log(`Script env variables:`, { env: process.env.NODE_ENV });

const env = process.env.NODE_ENV || 'production';

// prettier-ignore
module.exports = (
  env === 'production'
    ? require('./webpack.prod.config')
    : require('./webpack.dev.config')
);
