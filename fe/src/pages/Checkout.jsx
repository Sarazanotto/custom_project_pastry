import { useLocation } from "react-router-dom";
import CheckoutPage from "../components/sections/checkoutPage/CheckoutPage";

const Checkout = () => {
  const location = useLocation();
  const { amount, description, quoteId } = location.state || {};

  const orderAmount = amount || 1999;
  const orderSummary = description ? { description } : null;

  return (
    <div className="checkout-page">
      <CheckoutPage amount={orderAmount} orderSummary={orderSummary} quoteId={quoteId} /> 
    </div>
  );
};

export default Checkout;