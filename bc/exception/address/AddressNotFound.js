const HttpsException = require("../exception");

class AddressNotFound extends HttpsException {
  constructor(
    statusCode = 404,
    message = "Address not found",
    error = "This address request does not exist",
  ) {
    super(statusCode, message, error);
  }
}
module.exports = AddressNotFound;
