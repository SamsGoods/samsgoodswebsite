import { useState, useEffect } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cryptoService } from '@/services/payment';

const CryptoPayment = ({ onPaymentComplete, amount, currency = 'USD' }) => {
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [payment, setPayment] = useState(null);
  const [copied, setCopied] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [checkingStatus, setCheckingStatus] = useState(false);
  
  // Get supported cryptocurrencies
  const supportedCryptos = cryptoService.getSupportedCryptocurrencies();
  
  // Create crypto payment
  const createPayment = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const paymentResponse = await cryptoService.createCryptoPayment(amount, currency, selectedCrypto);
      
      if (!paymentResponse.success) {
        throw new Error(paymentResponse.error || 'Failed to create crypto payment');
      }
      
      setPayment(paymentResponse);
      
      // Start checking payment status
      startStatusCheck(paymentResponse.paymentId);
    } catch (error) {
      console.error('Error creating crypto payment:', error);
      setError(error.message || 'Payment creation failed');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Start checking payment status
  const startStatusCheck = (paymentId) => {
    // In a real implementation, this would poll the payment status at regular intervals
    // For demo purposes, we'll simulate a payment status check after a short delay
    
    const checkInterval = setInterval(async () => {
      try {
        setCheckingStatus(true);
        
        const statusResponse = await cryptoService.checkCryptoPaymentStatus(paymentId);
        
        if (statusResponse.success) {
          setPaymentStatus(statusResponse.status);
          
          // If payment is finished, complete the checkout
          if (statusResponse.status === 'finished') {
            clearInterval(checkInterval);
            
            const paymentResult = {
              success: true,
              paymentId,
              amount,
              currency,
              cryptoCurrency: selectedCrypto,
              method: 'crypto',
              timestamp: new Date().toISOString()
            };
            
            onPaymentComplete(paymentResult);
          }
          
          // If payment failed or expired, show error
          if (['failed', 'expired'].includes(statusResponse.status)) {
            clearInterval(checkInterval);
            setError(`Payment ${statusResponse.status}. Please try again.`);
          }
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
      } finally {
        setCheckingStatus(false);
      }
    }, 5000); // Check every 5 seconds
    
    // Clean up interval on component unmount
    return () => clearInterval(checkInterval);
  };
  
  // Handle crypto selection
  const handleCryptoChange = (value) => {
    setSelectedCrypto(value);
    setPayment(null);
    setPaymentStatus(null);
    setError(null);
  };
  
  // Copy address to clipboard
  const copyToClipboard = () => {
    if (payment && payment.paymentAddress) {
      navigator.clipboard.writeText(payment.paymentAddress);
      setCopied(true);
      
      // Reset copied state after 3 seconds
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
  };
  
  // Create payment on component mount or when crypto changes
  useEffect(() => {
    if (!payment && !isLoading && !error) {
      createPayment();
    }
  }, [selectedCrypto]);
  
  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <div>
        <label className="block text-sm font-medium mb-2">Select Cryptocurrency</label>
        <Select 
          value={selectedCrypto} 
          onValueChange={handleCryptoChange}
          disabled={isLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select cryptocurrency" />
          </SelectTrigger>
          <SelectContent>
            {supportedCryptos.map((crypto) => (
              <SelectItem key={crypto.code} value={crypto.code}>
                {crypto.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {isLoading ? (
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
          <p className="text-sm text-muted-foreground mt-4">Creating payment...</p>
        </div>
      ) : payment ? (
        <div className="space-y-6">
          <div className="bg-muted p-6 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-2">Send {payment.amount} {payment.currency}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              to the following address to complete your payment
            </p>
            
            <div className="bg-background p-3 rounded-md flex items-center justify-between mb-4">
              <code className="text-xs md:text-sm break-all">{payment.paymentAddress}</code>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={copyToClipboard}
                className="ml-2 flex-shrink-0"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p>Amount: <span className="font-medium">{payment.amount} {payment.currency}</span></p>
              <p>Equivalent: <span className="font-medium">${amount.toFixed(2)} {currency}</span></p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <div className={`h-3 w-3 rounded-full mr-2 ${
                paymentStatus === 'finished' ? 'bg-green-500' :
                paymentStatus === 'confirming' ? 'bg-yellow-500' :
                paymentStatus === 'waiting' ? 'bg-blue-500' :
                ['failed', 'expired'].includes(paymentStatus) ? 'bg-red-500' :
                'bg-muted-foreground'
              }`}></div>
              <p className="text-sm font-medium">
                {paymentStatus === 'finished' ? 'Payment Complete' :
                 paymentStatus === 'confirming' ? 'Confirming Payment' :
                 paymentStatus === 'waiting' ? 'Waiting for Payment' :
                 paymentStatus === 'failed' ? 'Payment Failed' :
                 paymentStatus === 'expired' ? 'Payment Expired' :
                 'Checking Payment Status'}
              </p>
              {checkingStatus && (
                <RefreshCw className="h-3 w-3 ml-2 animate-spin" />
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              This page will automatically update when payment is detected
            </p>
          </div>
          
          <div className="border-t pt-4">
            <h3 className="text-sm font-medium mb-2">Payment Instructions</h3>
            <ol className="space-y-2 text-sm text-muted-foreground list-decimal pl-4">
              <li>Copy the address above or scan it with your wallet app</li>
              <li>Send exactly {payment.amount} {payment.currency} to this address</li>
              <li>Wait for the transaction to be confirmed on the blockchain</li>
              <li>Once confirmed, your order will be processed automatically</li>
            </ol>
          </div>
        </div>
      ) : null}
      
      {payment && (
        <Button 
          onClick={createPayment}
          disabled={isLoading}
          variant="outline"
          className="w-full"
        >
          {isLoading ? 'Creating new payment...' : 'Create New Payment'}
        </Button>
      )}
    </div>
  );
};

export default CryptoPayment;

