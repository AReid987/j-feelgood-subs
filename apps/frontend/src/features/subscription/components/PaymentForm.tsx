typescriptreact
import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    }).then(({ paymentMethod, error }) => {
      if (error) {
        console.error('[Stripe error]', error);
        // TODO: Display error message to the user
      } else {
        console.log('[PaymentMethod]', paymentMethod);
        // TODO: Send paymentMethod.id to your backend
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Card details
          <CardElement />
        </label>
      </div>
      <button type="submit">
        Pay
      </button>
    </form>
  );
};

export default PaymentForm;