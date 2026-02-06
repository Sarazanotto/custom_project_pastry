const QuoteNotFound = require("../../exception/quote/quoteNotFound");
const UserNotExist = require("../../exception/user/userNotExist");

const quoteService = require("./quote.service");

const getAllQuotes = async (req, res, next) => {
  try {
    const { page = 1, pageSize = 5 } = req.query;
    const { totalPages, totalQuotes, quotes } = await quoteService.allQuotes(
      page,
      pageSize,
    );
    if (quotes.length === 0) {
      throw new Error("there aren't quotes");
    }
    res.status(200).send({
      statusCode: 200,
      page: Number(page),
      pageSize: Number(pageSize),
      totalPages: Number(totalPages),
      totalQuotes: Number(totalQuotes),
      quotes,
    });
  } catch (error) {
    next(error);
  }
};

const getQuotesById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      throw new UserNotExist();
    }
    const quotes = await quoteService.quotesById(userId);
    res.status(200).send({
      statusCode: 200,
      quotes,
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { body } = req;

    const newQuote = await quoteService.createQuote(userId, body);
    res.status(201).send({
      statusCode: 201,
      message: "Quote created successfully",
      newQuote,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { quoteId } = req.params;
    const { body } = req;
    if (!quoteId) {
      throw new QuoteNotFound();
    }
    const quote = await quoteService.updateQuote(userId, quoteId, body);
    if (!quote) {
      throw new QuoteNotFound();
    }
    res.status(200).send({
      statusCode: 200,
      message: "Successfully modifies quote",
      quote,
    });
  } catch (error) {
    next(error);
  }
};

const deleteOne = async (req, res, next) => {
  console.log("PARAMS:", req.params);
  try {
    const userId = req.user.id;
    const { quoteId } = req.params;
    if (!quoteId) {
      throw new QuoteNotFound();
    }
    const quote = await quoteService.deleteQuote(userId, quoteId);
    if (!quote) {
      return res.status(403).json({
        statusCode: 403,
        message: "You cannot delete this quote",
      });
    }
    res.status(200).send({
      statusCode: 200,
      message: "Successfully deleted quote",
      quote,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllQuotes,
  getQuotesById,
  create,
  update,
  deleteOne,
};
