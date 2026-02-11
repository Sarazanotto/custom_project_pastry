const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserSchema = require("../user/user.schema");
const HttpException= require('../../exception/exception')
const login = async (body) => {
  const { email, password } = body;
  const user = await UserSchema.findOne({ email });
  if (!user) {
   throw new HttpException(401, 'Invalid credentials')
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new HttpException(401, 'Invalid credentials')
  }

  const token = jwt.sign(
    {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );
  return { token };
};
module.exports = {
  login,
};
