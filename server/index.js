const cors = require('cors');
const express = require('express');
const configDB = require('../db');

class Server {

  #app;
  #paths;
  #port;

  constructor(port) {
    //Variables de clase
    this.#port = port;
    this.#paths = {
      auth: '/auth',
      search: '/search',
      users: '/users'
    };

    //Creación del servidor de express con socket.io
    this.#app = express();

    //Middlewares
    this.#middlewares();
    this.#routes();

    //Configure de Data Base
    configDB();
  }

  #middlewares() {
    this.#app.use(cors());
    //Lectura y Parsing de JSON en el body
    this.#app.use(express.json());
  }

  #routes() {
    this.#app.use(this.#paths.auth, require('../routes/auth'));
    this.#app.use(this.#paths.search, require('../routes/search'));
    this.#app.use(this.#paths.users, require('../routes/users'));
  }

  start() {
    this.#app.listen(this.#port);
  }
}

module.exports = Server;
