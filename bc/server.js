const express = require("express");
const cors = require("cors");
const startServer = require("./config/db");
const PORT = process.env.PORT ||4545;

const tokenVerify = require("./middleware/auth/tokenVerify");
const errorHandler = require("./middleware/errorHandler/errorHandler");

const cakeRoute = require("./modules/cake/cake.route");
const userRoute = require("./modules/user/user.route");
const quoteRoute = require("./modules/quote/quote.route");
const authRoute = require("./modules/auth/auth.route");
const addressRoute = require("./modules/address/address.route");
const passport = require("passport");
const session = require("express-session");
const { initGooglePassport } = require("./modules/oauth/google/google.config");
const googleRoute = require("./modules/oauth/google/google.route");
const { initFacebookPassport } = require("./modules/oauth/facebook/fb.config");
const facebookRoute = require("./modules/oauth/facebook/fb.route");
const payemntRoute = require("./modules/payment/payment.route");

const server = express();


const allowedOrigins = ["https://nuovo.it"];
if (process.env.DEV_MODE) {
  allowedOrigins.push("http://localhost:5173");
}

server.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

server.use(passport.initialize());
server.use(passport.session());
initGooglePassport();
initFacebookPassport();

server.use(
  cors({
    origin: allowedOrigins,
  }),
);
server.use("/webhook", express.raw({ type: "application/json" }));
server.use(express.json());
server.use(tokenVerify);

server.use("/", cakeRoute);
server.use("/", userRoute);
server.use("/", quoteRoute);
server.use("/", authRoute);
server.use("/", addressRoute);
server.use("/", googleRoute);
server.use("/", facebookRoute);
server.use("/", payemntRoute);
server.use(errorHandler);

startServer(PORT, server);
