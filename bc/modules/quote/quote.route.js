const express = require("express");
const quote = express.Router();
const quoteController = require("./quote.controller");
const adminAuth = require("../../middleware/auth/adminAuth");

quote.get("/quotes/admin/all", adminAuth, quoteController.getAllQuotes);
quote.patch(
  "/quotes/admin/:quoteId",
  adminAuth,
  quoteController.adminUpdateQuote,
);
quote.get("/quotes", quoteController.getQuotesById);
quote.post("/quotes", quoteController.create);
quote.patch("/quotes/:quoteId", quoteController.update);
quote.patch("/quotes/:quoteId/confirm", quoteController.userConfirmQuote);
quote.delete("/quotes/:quoteId", quoteController.deleteOne);

quote.patch("/quotes/:quoteId/pay", quoteController.markQuoteAsPaid);

module.exports = quote;
