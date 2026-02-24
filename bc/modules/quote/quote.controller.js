const QuoteNotFound = require("../../exception/quote/quoteNotFound");
const UserNotExist = require("../../exception/user/userNotExist");

const quoteService = require("./quote.service");
const emailService = require("../email/email.service");

const getAllQuotes = async (req, res, next) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;

    const { totalPages, totalQuotes, quotes } = await quoteService.allQuotes(
      page,
      pageSize,
    );

    if (quotes.length === 0) {
      return res.status(200).send({
        statusCode: 200,
        page: Number(page),
        pageSize: Number(pageSize),
        totalPages: 0,
        totalQuotes: 0,
        quotes: [],
      });
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
    const userId = req.user.id;
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

const adminUpdateQuote = async (req, res, next) => {
  try {
    const { quoteId } = req.params;
    const { priceQuoted, adminNotes, status, sendReadyEmail } = req.body;

    if (!quoteId) {
      throw new QuoteNotFound();
    }

    const quote = await quoteService.adminUpdateQuote(quoteId, {
      priceQuoted,
      adminNotes,
      status: status || "quoted",
    });

    if (!quote) {
      throw new QuoteNotFound();
    }

    try {
      if (sendReadyEmail) {
        await emailService.sendOrderReady(quote.user.email, {
          userName: `${quote.user.firstName} ${quote.user.lastName}`,
          event: quote.event,
          deliveryData: quote.deliveryData,
          deliveryMode: quote.deliveryMode,
          address: quote.address,
          adminNotes: quote.adminNotes,
        });
      } else {
        await emailService.sendQuoteEmail(quote.user.email, {
          userName: `${quote.user.firstName} ${quote.user.lastName}`,
          event: quote.event,
          serving: quote.serving,
          deliveryData: quote.deliveryData,
          form: quote.form,
          cakeBase: quote.cakeBase,
          cakeCream: quote.cakeCream,
          cakeTopping: quote.cakeTopping,
          cakeLettering: quote.cakeLettering,
          priceQuoted: quote.priceQuoted,
          adminNotes: quote.adminNotes,
        });
      }
    } catch (emailError) {}

    res.status(200).send({
      statusCode: 200,
      message: "Quote updated and email sent",
      quote,
    });
  } catch (error) {
    next(error);
  }
};

const userConfirmQuote = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { quoteId } = req.params;
    const { confirm } = req.body;

    if (!quoteId) {
      throw new QuoteNotFound();
    }

    const newStatus = confirm ? "confirmed" : "rejected";

    const quote = await quoteService.updateQuote(userId, quoteId, {
      status: newStatus,
    });

    if (!quote) {
      throw new QuoteNotFound();
    }

    res.status(200).send({
      statusCode: 200,
      message: confirm ? "Quote confirmed" : "Quote rejected",
      quote,
    });
  } catch (error) {
    next(error);
  }
};

const deleteOne = async (req, res, next) => {
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

const markQuoteAsPaid = async (req, res, next) => {
  try {
    const { quoteId } = req.params;
    const { stripePaymentId } = req.body;
    if (!quoteId) throw new QuoteNotFound();

    const quote = await quoteService.markAsPaid(quoteId, stripePaymentId);
    if (!quote) throw new QuoteNotFound();

    try {
      const populatedQuote = await quoteService.getQuoteById(quoteId);
      await emailService.sendOrderConfirmation(populatedQuote.user.email, {
        userName: `${populatedQuote.user.firstName} ${populatedQuote.user.lastName}`,
        event: populatedQuote.event,
        deliveryData: populatedQuote.deliveryData,
      });
    } catch (emailError) {
      console.error("Errore invio email conferma pagamento:", emailError);
    }

    res
      .status(200)
      .send({ statusCode: 200, message: "Payment confirmed", quote });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllQuotes,
  getQuotesById,
  create,
  update,
  adminUpdateQuote,
  userConfirmQuote,
  deleteOne,
  markQuoteAsPaid,
};
