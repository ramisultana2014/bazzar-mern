import { useParams } from "react-router-dom";
import { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51RreXOQ6vQ0LZyeO9S8uyYF9R7hYJvnwOElw8rutr06LNPSllKnmABXDidtdVWfY6JM6InP3YfahVFFw6VIHjl7l00ovfFDUOX"
);
type ErrorResponse = {
  msg: string;
};
function CheckOut() {
  const { orderId } = useParams<{ orderId: string }>();

  const fetchClientSecret = useCallback(async () => {
    // Create a Checkout Session
    // http://localhost:5100
    try {
      const res = await fetch(
        `/api/v1/stripe/create-checkout-session/${orderId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!res.ok) {
        const errorData: ErrorResponse = await res.json();
        throw new Error(errorData.msg || "Something went wrong");
      }
      const data = await res.json();
      return data.clientSecret;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  }, [orderId]);

  const options = { fetchClientSecret };
  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
export default CheckOut;
