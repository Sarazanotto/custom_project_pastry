const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const { user } = req;
    const redirectUrl = `${process.env.FRONTEND_URL}/success?user=${encodeURIComponent(JSON.stringify(user))}`;
    res.redirect(redirectUrl);
  } catch (error) {
    next(error);
  }
};

const manageOauthCallback = async (req, res, next) => {
  try {
    const { user } = req;
    const email = user.emails && user.emails[0] ? user.emails[0].value : null;
    const token = jwt.sign(
      { id: user.id, email: email },
      process.env.JWT_SECRET,
    );
    const redirectUrl = `${process.env.FRONTEND_URL}/success?token=${encodeURIComponent(token)}`;
    res.redirect(redirectUrl);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  auth,
  manageOauthCallback,
};
