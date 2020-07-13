const express = require("express");

const accountsRoute = require('./accountsRoute');

const server = express();

server.use(express.json());
server.use('/api/accounts', accountsRoute);

module.exports = server;
