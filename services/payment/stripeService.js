import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with a public key (this would be your actual Stripe public key in production)
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

// Create a payment intent (normally this would be done on the server)
export const createPaymentIntent = async (amount, currency = 'usd') => {
  try {
    // In a real implementation, this would be a call to your backend
    // which would create a payment intent and return the client secret
    
    // Simulating a successful response for demo purposes
    return {
      success: true,
      clientSecret: 'mock_client_secret_' + Math.random().toString(36).substring(2, 15),
      amount,
      currency
    };
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Process a credit card payment
export const processCardPayment = async (paymentMethodId, amount, currency = 'usd') => {
  try {
    // In a real implementation, this would confirm the payment with Stripe
    // using the payment method ID and the client secret
    
    // Simulating a successful payment for demo purposes
    return {
      success: true,
      paymentId: 'mock_payment_' + Math.random().toString(36).substring(2, 15),
      amount,
      currency
    };
  } catch (error) {
    console.error('Error processing card payment:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Get Stripe instance
export const getStripe = () => stripePromise;

// Create a payment method
export const createPaymentMethod = async (cardElement, billingDetails) => {
  try {
    const stripe = await stripePromise;
    
    // In a real implementation, this would create a payment method with Stripe
    // using the card element and billing details
    
    // Simulating a successful response for demo purposes
    return {
      success: true,
      paymentMethodId: 'mock_pm_' + Math.random().toString(36).substring(2, 15)
    };
  } catch (error) {
    console.error('Error creating payment method:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Validate card details
export const validateCardDetails = (cardNumber, expiry, cvc) => {
  // Basic validation for demo purposes
  const isCardNumberValid = /^\d{16}$/.test(cardNumber.replace(/\s/g, ''));
  const isExpiryValid = /^\d{2}\/\d{2}$/.test(expiry);
  const isCvcValid = /^\d{3,4}$/.test(cvc);
  
  return {
    isValid: isCardNumberValid && isExpiryValid && isCvcValid,
    errors: {
      cardNumber: isCardNumberValid ? null : 'Invalid card number',
      expiry: isExpiryValid ? null : 'Invalid expiry date (MM/YY)',
      cvc: isCvcValid ? null : 'Invalid CVC'
    }
  };
};

