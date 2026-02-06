const express = require("express");
const cors = require("cors");
const startServer = require("./config/db");
const PORT = 4545;

const tokenVerify = require("./middleware/auth/tokenVerify");
const errorHandler = require("./middleware/errorHandler/errorHandler");

const cakeRoute = require("./modules/cake/cake.route");
const userRoute = require("./modules/user/user.route");
const quoteRoute = require("./modules/quote/quote.route");
const authRoute = require("./modules/auth/auth.route");
const addressRoute= require('./modules/address/address.route')
const server = express();

server.use(cors());
server.use(express.json());
server.use(tokenVerify);

server.use("/", cakeRoute);
server.use("/", userRoute);
server.use("/", quoteRoute);
server.use("/", authRoute);
server.use("/",addressRoute)
server.use(errorHandler);

startServer(PORT, server);
