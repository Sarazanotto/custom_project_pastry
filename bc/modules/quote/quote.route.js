const express = require("express");
const quote = express.Router();
const quoteController= require('./quote.controller')
const adminAuth= require('../../middleware/auth/adminAuth')

quote.get("/quotes/admin/:userId", adminAuth ,quoteController.getAllQuotes)
quote.get("/quotes",quoteController.getQuotesById)
quote.post("/quotes",quoteController.create)
quote.patch("/quotes/:quoteId",quoteController.update)
quote.delete("/quotes/:quoteId",quoteController.deleteOne)

module.exports=quote