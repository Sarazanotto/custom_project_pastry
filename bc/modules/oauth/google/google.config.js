const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const initGooglePassport = () => {
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.ID_CLIENT_GOOGLE,
      clientSecret: process.env.SECRET_CLIENT_GOOGLE,
      callbackURL: process.env.CALLBACK_URL_GOOGLE,
    },
    (accessToken, refreshToken, profile, done) => {


      return done(null, profile);
    },
  ),
);

module.exports = {
  initGooglePassport,
};
