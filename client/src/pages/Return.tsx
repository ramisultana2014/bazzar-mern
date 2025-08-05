import { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";

import { Thanks } from "../components";

function Return() {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");

  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const sessionId = searchParams.get("session_id");
  // http://localhost:5100
  useEffect(() => {
    if (!sessionId) return;

    fetch(`/api/v1/stripe/session-status?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
      });
  }, [sessionId]);

  if (status === "open") {
    return <Navigate to={`/checkout/${orderId}`} />;
  }

  if (status === "complete") {
    return (
      <section id="success">
        <Thanks email={customerEmail} />
      </section>
    );
  }

  return null; // or a loading spinner, to handle the case where status is still null
}

export default Return;
