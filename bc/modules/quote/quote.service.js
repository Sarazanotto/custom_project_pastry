const QuoteSchema = require("./quote.schema");

const allQuotes = async (page, pageSize) => {
  const quotes = await QuoteSchema.find()
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip((page - 1) * pageSize)
    .populate("user", "firstName lastName email phone userName")
    .populate("address", "street city zipCode");
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
  return QuoteSchema.find({ user: userId })
    .sort({ createdAt: -1 })
    .populate("address", "street city zipCode");
};

const createQuote = async (userId, body) => {
  const newQuote = new QuoteSchema({
    ...body,
    user: userId,
    status: "pending",
  });

  await newQuote.save();



  try {
    const populatedQuote = await QuoteSchema.findById(newQuote._id)
      .populate("user", "firstName lastName email phone")
      .populate("address", "street city zipCode");

    
    if (!populatedQuote) {
    
      return newQuote;
    }

    return populatedQuote;
  } catch (error) {
  
    return newQuote;
  }
};

const updateQuote = async (userId, quoteId, body) => {
  return QuoteSchema.findOneAndUpdate({ _id: quoteId, user: userId }, body, {
    new: true,
  }).populate("address", "street city zipCode");
};

const adminUpdateQuote = async (quoteId, body) => {
  return QuoteSchema.findByIdAndUpdate(quoteId, body, {
    new: true,
  })
    .populate("user", "firstName lastName email phone")
    .populate("address", "street city zipCode");
};

const getQuoteById = async (quoteId) => {
  return QuoteSchema.findById(quoteId)
    .populate("user", "firstName lastName email phone")
    .populate("address", "street city zipCode");
};

const deleteQuote = async (userId, quoteId) => {
 
  return QuoteSchema.findOneAndDelete({
    _id: quoteId,
    user: userId,
  });
};

const markAsPaid = async (quoteId, stripePaymentId) => {
  return QuoteSchema.findByIdAndUpdate(
    quoteId,
    { isPaid: true, stripePaymentId, paidAt: new Date(), status: "in_progress" },
    { new: true }
  );
};

module.exports = {
  allQuotes,
  quotesById,
  createQuote,
  updateQuote,
  adminUpdateQuote,
  getQuoteById,
  deleteQuote,
  markAsPaid
};
