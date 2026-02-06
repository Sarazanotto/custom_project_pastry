const adminAuth = (req, res, next) => {
  if (!req.ueser.role != "admin") {
    return res.status(403).json({
      statusCode: 403,
      error: "accesso negato",
    });
  }
  next();
};

module.exports = adminAuth;
