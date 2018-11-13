require('dotenv').config({ path: '.env' });
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

// TODO handle cookies
// TODO populate current user

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL,
    }
  },
  data => {
    console.log(`Server is now running on http://localhost:${data.port}`);
  }
);
