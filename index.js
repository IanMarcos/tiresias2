require('dotenv').config();
const Server = require('./server');

const app = new Server(process.env.PORT);
app.start();
