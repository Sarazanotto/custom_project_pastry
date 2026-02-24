import { useState } from "react";

const useStripePayment = () => {
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const initPayment = async (amount, metadata = {}) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/create-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ amount, currency: "eur", metadata }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Errore nella creazione del pagamento");
      }

      const { clientSecret } = await res.json();
      setClientSecret(clientSecret);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const confirmQuotePayment = async (quoteId, paymentIntent) => {
    await fetch(`${import.meta.env.VITE_SERVER_URL}/quotes/${quoteId}/pay`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ stripePaymentId: paymentIntent.id }),
    });
  };

  const resetPayment = () => {
    setClientSecret(null);
    setError(null);
  };

  return { clientSecret, loading, error, initPayment, confirmQuotePayment, resetPayment };
};

export default useStripePayment;