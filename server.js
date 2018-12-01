const express = require('express');
const cors = require('cors');
const cookie = require('cookie-session')

const configureRoutes = require('./config/routes');

const server = express();
const corsOptions = {
 origin: 'http://localhost:3000',
 credentials: true
};

server.use(express.json());
server.use(cors(corsOptions));
server.use(cookie({
  name: 'login_cookie',
  secret: 'sdfksdjlflsdij;adijfa;299289232;aSKDASKD(@2',
  maxAge: 1000 * 60 * 15
}))

configureRoutes(server);

module.exports = {
  server,
};
