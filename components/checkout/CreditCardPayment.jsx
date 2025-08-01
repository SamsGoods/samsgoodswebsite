import { useState } from 'react';
import { CreditCard, Calendar, Lock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { stripeService } from '@/services/payment';

const CreditCardPayment = ({ onPaymentComplete, amount, currency = 'USD' }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Format expiry date (MM/YY)
  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    
    return v;
  };

  // Handle card number change
  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
    
    // Clear error when user starts typing
    if (errors.cardNumber) {
      setErrors({ ...errors, cardNumber: null });
    }
  };

  // Handle expiry change
  const handleExpiryChange = (e) => {
    const formattedValue = formatExpiry(e.target.value);
    setExpiry(formattedValue);
    
    // Clear error when user starts typing
    if (errors.expiry) {
      setErrors({ ...errors, expiry: null });
    }
  };

  // Handle CVC change
  const handleCvcChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCvc(value);
    
    // Clear error when user starts typing
    if (errors.cvc) {
      setErrors({ ...errors, cvc: null });
    }
  };

  // Handle name change
  const handleNameChange = (e) => {
    setName(e.target.value);
    
    // Clear error when user starts typing
    if (errors.name) {
      setErrors({ ...errors, name: null });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validation = stripeService.validateCardDetails(cardNumber, expiry, cvc);
    
    // Additional validation for name
    if (!name.trim()) {
      validation.isValid = false;
      validation.errors = { ...validation.errors, name: 'Name is required' };
    }
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // In a real implementation, this would create a payment method and process the payment
      // For demo purposes, we'll simulate a successful payment after a short delay
      setTimeout(() => {
        const paymentResult = {
          success: true,
          paymentId: 'mock_card_payment_' + Math.random().toString(36).substring(2, 15),
          amount,
          currency,
          method: 'credit-card',
          last4: cardNumber.slice(-4),
          timestamp: new Date().toISOString()
        };
        
        setIsProcessing(false);
        onPaymentComplete(paymentResult);
      }, 1500);
    } catch (error) {
      console.error('Error processing credit card payment:', error);
      setIsProcessing(false);
      setErrors({ general: error.message || 'Payment processing failed' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.general && (
        <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">
          {errors.general}
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="card-name">Name on Card</Label>
          <div className="relative">
            <Input
              id="card-name"
              placeholder="John Doe"
              value={name}
              onChange={handleNameChange}
              className={errors.name ? 'border-destructive' : ''}
            />
          </div>
          {errors.name && (
            <p className="text-destructive text-sm mt-1">{errors.name}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="card-number">Card Number</Label>
          <div className="relative">
            <Input
              id="card-number"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={handleCardNumberChange}
              maxLength={19}
              className={errors.cardNumber ? 'border-destructive pr-10' : 'pr-10'}
            />
            <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          </div>
          {errors.cardNumber && (
            <p className="text-destructive text-sm mt-1">{errors.cardNumber}</p>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="expiry">Expiry Date</Label>
            <div className="relative">
              <Input
                id="expiry"
                placeholder="MM/YY"
                value={expiry}
                onChange={handleExpiryChange}
                maxLength={5}
                className={errors.expiry ? 'border-destructive pr-10' : 'pr-10'}
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            </div>
            {errors.expiry && (
              <p className="text-destructive text-sm mt-1">{errors.expiry}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="cvc">CVC</Label>
            <div className="relative">
              <Input
                id="cvc"
                placeholder="123"
                value={cvc}
                onChange={handleCvcChange}
                maxLength={4}
                className={errors.cvc ? 'border-destructive pr-10' : 'pr-10'}
              />
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            </div>
            {errors.cvc && (
              <p className="text-destructive text-sm mt-1">{errors.cvc}</p>
            )}
          </div>
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full"
        disabled={isProcessing}
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
          <>Pay ${amount.toFixed(2)}</>
        )}
      </Button>
      
      <div className="flex items-center justify-center text-sm text-muted-foreground mt-4">
        <Lock className="h-3 w-3 mr-1" />
        <span>Your payment information is secure</span>
      </div>
    </form>
  );
};

export default CreditCardPayment;

