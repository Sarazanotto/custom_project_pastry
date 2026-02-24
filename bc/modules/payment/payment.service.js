const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (amount, currency = "eur", metadata = {}) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount,   
    currency, 
    payment_method_types: ["card"],
    metadata, 
  });


  return paymentIntent.client_secret;
};


const handleWebhookEvent = (rawBody, signature) => {

  const event = stripe.webhooks.constructEvent(
    rawBody,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET
  );

  return event;
};

module.exports = { createPaymentIntent, handleWebhookEvent };