const jwt = require("jsonwebtoken");

const EXCLUDED_ROUTES = ["/login", "/user", "/cakes", "/detail","/google","/google/callback","/facebook","/facebook/callback"];


const verifyToken = (req, res, next) => {
  if (EXCLUDED_ROUTES.includes(req.path)) return next();

  const token = req.header("Authorization");

  if (!token) {
    return res.status(400).send({ message: "missing token!!!" });
  }

  try {
    const sanitizedToken = token.replace("Bearer ", "");
    const decoded = jwt.verify(sanitizedToken, process.env.JWT_SECRET);

    req.user = decoded;

    console.log("User autenticato:", req.user.id);

    next();
  } catch (e) {

    next(e);
  }
};

module.exports = verifyToken;
