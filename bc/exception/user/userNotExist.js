const HttpsException = require("../exception");

class UserNotExist extends HttpsException {
  constructor(
    statusCode = 400,
    message = "User not found",
    error = "The request must contain an user id",
  ) {
    super(statusCode, message, error);
  }
}
module.exports = UserNotExist;
