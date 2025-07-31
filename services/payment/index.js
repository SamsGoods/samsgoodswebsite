import * as stripeService from './stripeService';
import * as paypalService from './paypalService';
import * as cryptoService from './cryptoService';

// Payment methods
export const PAYMENT_METHODS = {
  CREDIT_CARD: 'credit-card',
  PAYPAL: 'paypal',
  CRYPTO: 'crypto'
};

// Initialize all payment services
export const initializePaymentServices = () => {
  try {
    // Initialize Stripe
    const stripeInitialized = true; // Stripe is initialized on import
    
    // Initialize PayPal
    const paypalInitialized = paypalService.initializePayPal();
    
    // Initialize Crypto
    const cryptoInitialized = cryptoService.initializeCryptoPayments();
    
    return {
      success: stripeInitialized && paypalInitialized.success && cryptoInitialized.success,
      stripe: stripeInitialized,
      paypal: paypalInitialized.success,
      crypto: cryptoInitialized.success
    };
  } catch (error) {
    console.error('Error initializing payment services:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Process payment based on selected payment method
export const processPayment = async (paymentMethod, paymentDetails, orderDetails) => {
  try {
    switch (paymentMethod) {
      case PAYMENT_METHODS.CREDIT_CARD:
        return await processCardPayment(paymentDetails, orderDetails);
      case PAYMENT_METHODS.PAYPAL:
        return await processPayPalPayment(paymentDetails, orderDetails);
      case PAYMENT_METHODS.CRYPTO:
        return await processCryptoPayment(paymentDetails, orderDetails);
      default:
        throw new Error(`Unsupported payment method: ${paymentMethod}`);
    }
  } catch (error) {
    console.error('Error processing payment:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Process credit card payment
const processCardPayment = async (paymentDetails, orderDetails) => {
  const { cardNumber, expiry, cvc, name } = paymentDetails;
  const { amount, currency } = orderDetails;
  
  // Validate card details
  const validation = stripeService.validateCardDetails(cardNumber, expiry, cvc);
  if (!validation.isValid) {
    return {
      success: false,
      error: 'Invalid card details',
      validationErrors: validation.errors
    };
  }
  
  // In a real implementation, this would create a payment method and process the payment
  // For demo purposes, we'll simulate a successful payment
  return {
    success: true,
    paymentId: 'mock_card_payment_' + Math.random().toString(36).substring(2, 15),
    amount,
    currency,
    method: PAYMENT_METHODS.CREDIT_CARD,
    last4: cardNumber.slice(-4),
    timestamp: new Date().toISOString()
  };
};

// Process PayPal payment
const processPayPalPayment = async (paymentDetails, orderDetails) => {
  const { orderId } = paymentDetails;
  const { amount, currency } = orderDetails;
  
  // In a real implementation, this would capture the PayPal payment
  // For demo purposes, we'll simulate a successful payment
  return {
    success: true,
    paymentId: 'mock_paypal_payment_' + Math.random().toString(36).substring(2, 15),
    orderId,
    amount,
    currency,
    method: PAYMENT_METHODS.PAYPAL,
    timestamp: new Date().toISOString()
  };
};

// Process cryptocurrency payment
const processCryptoPayment = async (paymentDetails, orderDetails) => {
  const { cryptoCurrency } = paymentDetails;
  const { amount, currency } = orderDetails;
  
  // Create a crypto payment
  const payment = await cryptoService.createCryptoPayment(amount, currency, cryptoCurrency);
  
  if (!payment.success) {
    return payment;
  }
  
  // In a real implementation, this would return the payment details
  // and the frontend would show instructions for the user to complete the payment
  return {
    success: true,
    ...payment,
    method: PAYMENT_METHODS.CRYPTO,
    timestamp: new Date().toISOString()
  };
};

// Export individual services for direct access
export { stripeService, paypalService, cryptoService };

