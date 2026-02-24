import { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button, Alert, Space } from "antd";
import "./checkout.css";

const PaymentForm = ({ onSuccess, onCancel, quoteId, confirmQuotePayment }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (stripeError) {
      setError(stripeError.message);
      setLoading(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      await confirmQuotePayment(quoteId, paymentIntent);
      onSuccess(paymentIntent);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <PaymentElement />

      {error && (
        <Alert message={error} type="error" showIcon className="checkout-alert" />
      )}

      <Space className="payment-actions">
        <Button onClick={onCancel} disabled={loading} size="large">
          ← Annulla
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          disabled={!stripe || loading}
          loading={loading}
          size="large"
        >
          Paga ora
        </Button>
      </Space>
    </form>
  );
};

export default PaymentForm;