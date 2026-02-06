const QuoteSchema = require("./quote.schema");

const allQuotes = async (page, pageSize) => {
  const quotes = await QuoteSchema.find()
    .limit(pageSize)
    .skip((page - 1) * pageSize)
    .populate("user", "firstName lastName email phone userName");
  const totalQuotes = await QuoteSchema.countDocuments();
  const totalPages = Math.ceil(totalQuotes / pageSize);
  return {
    page,
    pageSize,
    totalQuotes,
    totalPages,
    quotes,
  };
};

const quotesById = async (userId) => {
  return QuoteSchema.find({ user: userId });
};

const createQuote = async (userId, body) => {
  const newQuote = new QuoteSchema({ ...body, user: userId });
  return newQuote.save();
};

const updateQuote = async (userId, quoteId, body) => {
  return QuoteSchema.findOneAndUpdate({ _id: quoteId, user: userId }, body, {
    new: true,
  });
};

const deleteQuote = async (userId, quoteId) => {
  console.log(quoteId, userId);
  return QuoteSchema.findOneAndDelete({
    _id: quoteId,
    user: userId,
  });
  console.log(quoteId, userId);
};

module.exports = {
  allQuotes,
  quotesById,
  createQuote,
  updateQuote,
  deleteQuote,
};
