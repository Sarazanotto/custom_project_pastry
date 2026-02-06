const HttpsException = require("../exception");

class UserNotFound extends HttpsException {
  constructor(
    statusCode = 404,
    message = "User not found",
    error = "This user request does not exist",
  ) {
    super(statusCode, message, error);
  }
}
module.exports = UserNotFound;
