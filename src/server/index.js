import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import configDB from '../db/index.js';
import { startUnusedFilesCleaner } from './config.js';
import swaggerSetup from '../../docs/swagger.js';
import authRoutes from '../routes/auth.js';
import materialsRoutes from '../routes/materials.js';
import searchRoutes from '../routes/search.js';
import usersRoutes from '../routes/users.js';

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
    this.#setupSwagger();
    startUnusedFilesCleaner('uploads');
  }

  #middlewares() {
    this.#app.use(cors());
    this.#app.use(express.json());
  }

  #routes() {
    this.#app.use(this.#paths.auth, authRoutes);
    this.#app.use(this.#paths.materials, materialsRoutes);
    this.#app.use(this.#paths.search, searchRoutes);
    this.#app.use(this.#paths.users, usersRoutes);
  }

  #setupSwagger() {
    this.#app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSetup));
  }

  start() {
    this.#app.listen(this.#port);
  }
}

export default Server;
