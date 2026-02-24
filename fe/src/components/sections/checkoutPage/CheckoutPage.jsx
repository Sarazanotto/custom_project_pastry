import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Button, Card, Typography, Alert, Result } from "antd";
import PaymentForm from "./PaymentForm";
import useStripePayment from "../../../hook/usePayment";
import { useNavigate } from "react-router-dom";
import "./checkout.css";

const { Title, Text } = Typography;

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutPage = ({ amount = 1999, orderSummary = null, quoteId }) => {
  const {
    clientSecret,
    loading,
    error,
    initPayment,
    confirmQuotePayment,
    resetPayment,
  } = useStripePayment();

  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const handleNavigateOrders = () => navigate("/orders");

  const handleInitPayment = () => initPayment(amount, { quoteId });
  const handleSuccess = (paymentIntent) => {
    console.log("Pagamento completato:", paymentIntent.id);
    setSuccess(true);
  };

  if (success) {
    return (
      <Card className="checkout-card checkout-card--small">
        <Result
          status="success"
          title="Pagamento completato!"
          subTitle="Grazie per il tuo acquisto."
          extra={
            <Button type="primary" onClick={handleNavigateOrders}>
              Torna ai miei ordini
            </Button>
          }
        />
      </Card>
    );
  }

  if (clientSecret) {
    return (
      <Card className="checkout-card">
        <Title level={3}>Completa il pagamento</Title>
        <Text type="secondary">
          Totale:
          <Text strong className="checkout-amount">
            €{(amount / 100).toFixed(2)}
          </Text>
        </Text>
        <Elements
          stripe={stripePromise}
          options={{ clientSecret, wallets: { link: "never" } }}
        >
          <PaymentForm
            onSuccess={handleSuccess}
            onCancel={resetPayment}
            quoteId={quoteId}
            confirmQuotePayment={confirmQuotePayment}
          />
        </Elements>
      </Card>
    );
  }

  return (
    <Card className="checkout-card">
      <Title level={3}>Riepilogo ordine</Title>

      {orderSummary && (
        <Card size="small" className="checkout-order-details">
          <Text>{orderSummary.description}</Text>
        </Card>
      )}

      <Text type="secondary" className="checkout-total">
        Totale:
        <Text strong className="checkout-amount">
          €{(amount / 100).toFixed(2)}
        </Text>
      </Text>

      {error && (
        <Alert title={error} type="error" showIcon className="checkout-alert" />
      )}

      <Button
        type="primary"
        size="large"
        block
        loading={loading}
        onClick={handleInitPayment}
      >
        Procedi al pagamento →
      </Button>
    </Card>
  );
};

export default CheckoutPage;
