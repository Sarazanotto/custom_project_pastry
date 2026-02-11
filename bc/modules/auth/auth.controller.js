const user = require("../user/user.route");
const authService = require("./auth.service");

const login = async (req, res, next) => {
  try {
    const response = await authService.login(req.body);
    res.status(200).json({
      statusCode: 200,
      message: "Login succesfully",
      token: response.token,
      
      
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
