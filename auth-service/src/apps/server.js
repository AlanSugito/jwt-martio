const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRouter = require('../routers/authRouter');
const userRouter = require('../routers/userRouter');
const errorHandler = require('../middleware/errorHandler');
const authHandler = require('../middleware/authHandler');

const server = express();

server.use(cors({credentials: true, origin: 'http://localhost:5173'}));
server.use(cookieParser());
server.use(express.json());

server.get('/', (_, res) => {
  res.status(200).json({hello: 'world'});
});

server.use('/auth', authRouter);
server.use(authHandler);
server.use('/users', userRouter);

server.use(errorHandler);

module.exports = server;
