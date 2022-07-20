/* eslint-disable global-require */
const cors = require('cors');
const express = require('express');
const configDB = require('../db');

class Server {
  #app;

  #paths;

  #port;

  constructor(port) {
    this.#port = port || 8080;
    this.#paths = {
      auth: '/auth',
      materials: '/materials',
      search: '/search',
      users: '/users',
    };

    this.#app = express();
    this.#middlewares();
    this.#routes();
    configDB();
  }

  #middlewares() {
    this.#app.use(cors());
    this.#app.use(express.json());
  }

  #routes() {
    this.#app.use(this.#paths.auth, require('../routes/auth'));
    this.#app.use(this.#paths.materials, require('../routes/materials'));
    this.#app.use(this.#paths.search, require('../routes/search'));
    this.#app.use(this.#paths.users, require('../routes/users'));
  }

  start() {
    this.#app.listen(this.#port);
  }
}

module.exports = Server;
