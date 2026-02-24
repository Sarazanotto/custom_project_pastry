const { createPaymentIntent, handleWebhookEvent } = require("./payment.service");
const { markAsPaid } = require("../quote/quote.service");


const createIntent = async (req, res, next) => {
  try {
    const { amount, currency, metadata } = req.body;

    if (!amount || typeof amount !== "number" || amount < 50) {
      return res.status(400).json({ error: "Importo non valido (minimo €0,50)" });
    }

    const clientSecret = await createPaymentIntent(amount, currency, metadata);
    res.json({ clientSecret });
  } catch (err) {
    next(err);
  }
};

const webhook = async (req, res) => {
  try {
    const signature = req.headers["stripe-signature"];
    const event = handleWebhookEvent(req.body, signature);

    switch (event.type) {
      case "payment_intent.succeeded": {
        const pi = event.data.object;



        if (pi.metadata?.quoteId) {
          await markAsPaid(pi.metadata.quoteId, pi.id);
        
        }
        break;
      }
      case "payment_intent.payment_failed":
    
        break;
      default:
    
    }

    res.json({ received: true });
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
};

module.exports = { createIntent, webhook };