'use strict'

const express = require('express');
const { resolve } = require('path');
const pkg = require('../package.json');

// const pkg
const app = express();

if (process.env.NODE_ENV !== 'production') {
  app.use(require('volleyball'));
}

module.exports = app
  .use(express.static(resolve(__dirname, '..', 'public')))
  .get('/*', (_, res) => res.sendFile(resolve(__dirname, '..', 'public', 'index.html')));

if (module === require.main) {
  const server = app.listen(
    process.env.PORT || 1337,
    () => {
      console.log(`--- Started HTTP Server for ${pkg.name} ---`)
      console.log(`Listening on ${JSON.stringify(server.address())}`)
    }
  )
}
