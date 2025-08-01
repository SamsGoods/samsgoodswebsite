import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { paypalService } from '@/services/payment';

const PayPalPayment = ({ onPaymentComplete, amount, currency = 'USD' }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // In a real implementation, this would load the PayPal SDK and render the PayPal button
  // For demo purposes, we'll simulate the PayPal checkout flow
  
  useEffect(() => {
    // Simulate loading the PayPal SDK
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  // Handle PayPal checkout
  const handlePayPalCheckout = async () => {
    setIsProcessing(true);
    setError(null);
    
    try {
      // Create a PayPal order
      const orderResponse = await paypalService.createPayPalOrder(amount, currency);
      
      if (!orderResponse.success) {
        throw new Error(orderResponse.error || 'Failed to create PayPal order');
      }
      
      // Simulate PayPal checkout flow
      // In a real implementation, this would redirect to PayPal for authentication
      // and then capture the payment on return
      
      // Simulate a successful payment after a short delay
      setTimeout(() => {
        const paymentResult = {
          success: true,
          paymentId: 'mock_paypal_payment_' + Math.random().toString(36).substring(2, 15),
          orderId: orderResponse.orderId,
          amount,
          currency,
          method: 'paypal',
          timestamp: new Date().toISOString()
        };
        
        setIsProcessing(false);
        onPaymentComplete(paymentResult);
      }, 2000);
    } catch (error) {
      console.error('Error processing PayPal payment:', error);
      setIsProcessing(false);
      setError(error.message || 'Payment processing failed');
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-muted h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-4">Loading PayPal...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <div className="text-center py-4">
        <div className="bg-[#0070BA] text-white font-bold text-xl py-2 px-4 rounded-md inline-flex items-center mb-4">
          <span className="mr-1">Pay</span>
          <span className="text-[#0070BA] bg-white py-1 px-1 rounded">Pal</span>
        </div>
        <p className="text-muted-foreground mb-6">
          Click the button below to complete your payment securely with PayPal.
        </p>
        
        <Button 
          onClick={handlePayPalCheckout}
          disabled={isProcessing}
          className="w-full bg-[#0070BA] hover:bg-[#005ea6] py-6"
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>Pay with PayPal</>
          )}
        </Button>
      </div>
      
      <div className="border-t pt-4">
        <h3 className="text-sm font-medium mb-2">Why PayPal?</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start">
            <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Fast and secure checkout</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>No need to enter payment details on our site</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>PayPal Purchase Protection</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PayPalPayment;

