import * as dotenv from 'dotenv';
import Server from './src/server/index.js';

dotenv.config();
const app = new Server(process.env.PORT);
app.start();
