import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, subtotal } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Calculate shipping cost (free over $50)
  const shippingCost = subtotal >= 50 ? 0 : 5.99;
  
  // Calculate total
  const total = subtotal + shippingCost;
  
  // Handle checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/checkout');
    }, 800);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      {cartItems.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="w-full lg:w-2/3">
            <div className="bg-background rounded-lg shadow-sm overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b text-sm font-medium text-muted-foreground">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
              
              {cartItems.map((item) => (
                <div key={`${item.id}-${JSON.stringify(item.options)}`} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b items-center">
                  {/* Product Info */}
                  <div className="col-span-1 md:col-span-6 flex items-center gap-4">
                    <div className="w-20 h-20 bg-muted rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      
                      {/* Display options if they exist */}
                      {item.options && Object.keys(item.options).length > 0 && (
                        <div className="text-sm text-muted-foreground mt-1">
                          {item.options.size && <div>Size: {item.options.size}</div>}
                          {item.options.color && <div>Color: {item.options.color}</div>}
                          {item.options.licenseType && (
                            <div>License: {
                              item.options.licenseType.charAt(0).toUpperCase() + 
                              item.options.licenseType.slice(1)
                            }</div>
                          )}
                          {item.options.customDesign && (
                            <div className="flex items-center mt-1">
                              <span className="mr-2">Custom Design:</span>
                              <div className="w-6 h-6 rounded-md overflow-hidden">
                                <img 
                                  src={item.options.customDesign} 
                                  alt="Custom design" 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="col-span-1 md:col-span-2 flex md:block items-center justify-between">
                    <span className="md:hidden text-muted-foreground">Price:</span>
                    <span className="text-center block">${item.price.toFixed(2)}</span>
                  </div>
                  
                  {/* Quantity */}
                  <div className="col-span-1 md:col-span-2 flex md:justify-center items-center justify-between">
                    <span className="md:hidden text-muted-foreground">Quantity:</span>
                    <div className="flex items-center">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1, item.options)}
                        className="p-1 rounded-md hover:bg-muted"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.options)}
                        className="p-1 rounded-md hover:bg-muted"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Total and Remove */}
                  <div className="col-span-1 md:col-span-2 flex items-center justify-between md:justify-end">
                    <span className="md:hidden text-muted-foreground">Total:</span>
                    <div className="flex items-center gap-4">
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      <button
                        onClick={() => removeFromCart(item.id, item.options)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Continue Shopping */}
            <div className="mt-6">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => navigate(-1)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6" />
                </svg>
                Continue Shopping
              </Button>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-background rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <Button 
                className="w-full flex items-center justify-center gap-2"
                onClick={handleCheckout}
                disabled={cartItems.length === 0 || isProcessing}
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
                  <>
                    Proceed to Checkout <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
              
              <div className="mt-6 text-sm text-muted-foreground">
                <p className="mb-2">We accept:</p>
                <div className="flex gap-2">
                  <div className="bg-muted p-1 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="20" viewBox="0 0 32 20">
                      <rect width="32" height="20" fill="#252525" rx="2" />
                      <path fill="#2872B9" d="M12 5h8v10h-8z" />
                      <path fill="#EE7328" d="M13 10a5 5 0 0 1 3-4.9 5 5 0 1 0 0 9.8A5 5 0 0 1 13 10Z" />
                      <path fill="#F1F2F2" d="M21 10a5 5 0 0 1-5 5 5 5 0 0 1-3-4.9 5 5 0 0 0 0 9.8A9 9 0 0 0 21 10Z" />
                    </svg>
                  </div>
                  <div className="bg-muted p-1 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="20" viewBox="0 0 32 20">
                      <rect width="32" height="20" fill="#252525" rx="2" />
                      <path fill="#F1F2F2" d="M21.5 5h-11A1.5 1.5 0 0 0 9 6.5v7A1.5 1.5 0 0 0 10.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 21.5 5Z" />
                      <path fill="#252525" d="M13 9a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z" />
                      <path fill="#252525" d="M19 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
                    </svg>
                  </div>
                  <div className="bg-muted p-1 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="20" viewBox="0 0 32 20">
                      <rect width="32" height="20" fill="#252525" rx="2" />
                      <path fill="#0070E0" d="M20.5 5.5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z" />
                      <path fill="#001C64" d="M12 5.5a5 5 0 0 0-1 9.9V15h2v-4h2v4h2v-.6a5 5 0 0 0-1-9.9 5 5 0 0 0-4 1Z" />
                    </svg>
                  </div>
                  <div className="bg-muted p-1 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="20" viewBox="0 0 32 20">
                      <rect width="32" height="20" fill="#252525" rx="2" />
                      <path fill="#F1F2F2" d="M16 5.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm0 7.5a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                      <path fill="#F1F2F2" d="M22 10a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="flex justify-center mb-4">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Button asChild size="lg">
            <Link to="/">Start Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartPage;

