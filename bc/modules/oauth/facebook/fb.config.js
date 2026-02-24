const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;

const initFacebookPassport = () => {
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));
};

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.ID_CLIENT_FB,
      clientSecret: process.env.SECRET_CLIENT_FB,
      callbackURL: process.env.CALLBACK_URL_FB,
    },
    (accessToken, refreshToken, profile, done) => {
   

      return done(null, profile);
    },
  ),
);

module.exports = {
  initFacebookPassport,
};
