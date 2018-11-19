require('dotenv').config({ path: '.env' });
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL,
    },
  },
  data => {
    const now = new Date().toLocaleString();
    console.log(`${now} - Server ready on: http://localhost:${data.port}`);
  },
);
