const jwt = require("jsonwebtoken");

const EXCLUDED_ROUTES = ["/login", "/user",'/cakes','/detail'];
console.log(EXCLUDED_ROUTES, 'ROTTE ESCLUSE')
const verifyToken = (req, res, next) => {
  if (EXCLUDED_ROUTES.includes(req.path)) return next();
  console.log("Request path:", req.path);
  const token = req.header("Authorization");

  if (!token) {
    return res.status(400).send({ message: "missing token!!!" });
  }

  try {
    const sanitizedToken = token.replace("Bearer ", "");
    req.user = jwt.verify(sanitizedToken, process.env.JWT_SECRET);

    next();
  } catch (e) {
    next(e);
  }
};

module.exports = verifyToken;
