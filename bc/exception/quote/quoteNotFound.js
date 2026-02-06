const HttpsException = require("../exception");

class QuoteNotFound extends HttpsException {
  constructor(
    statusCode = 404,
    message = "Quote not found",
    error = "This quote request does not exist",
  ) {
    super(statusCode, message, error);
  }
}
module.exports = QuoteNotFound;
