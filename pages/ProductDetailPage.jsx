import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShoppingCart, Check, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/hooks/useCart';
import { getProductById } from '@/data/products';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [customDesign, setCustomDesign] = useState(null);
  
  // Fetch product data
  useEffect(() => {
    const fetchProduct = () => {
      const foundProduct = getProductById(productId);
      
      if (foundProduct) {
        setProduct(foundProduct);
        // Set default selections
        if (foundProduct.sizes && foundProduct.sizes.length > 0) {
          setSelectedSize(foundProduct.sizes[0]);
        }
        if (foundProduct.colors && foundProduct.colors.length > 0) {
          setSelectedColor(foundProduct.colors[0]);
        }
      }
      
      setLoading(false);
    };
    
    fetchProduct();
  }, [productId]);
  
  // Handle image navigation
  const nextImage = () => {
    if (product && product.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };
  
  const prevImage = () => {
    if (product && product.images.length > 1) {
      setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
    }
  };
  
  // Handle quantity changes
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  
  // Handle custom design upload
  const handleCustomDesignUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCustomDesign({
          file,
          preview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    if (!selectedSize && product.sizes && product.sizes.length > 0) {
      toast({
        title: "Please select a size",
        description: "You must select a size before adding to cart.",
        variant: "destructive"
      });
      return;
    }
    
    if (!selectedColor && product.colors && product.colors.length > 0) {
      toast({
        title: "Please select a color",
        description: "You must select a color before adding to cart.",
        variant: "destructive"
      });
      return;
    }
    
    const options = {
      size: selectedSize,
      color: selectedColor,
      customDesign: customDesign ? customDesign.preview : null
    };
    
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      category: product.category
    }, quantity, options);
    
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.title} added to your cart.`,
      action: (
        <Button variant="outline" size="sm" onClick={() => navigate('/cart')}>
          View Cart
        </Button>
      ),
    });
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 bg-muted animate-pulse rounded-lg h-[500px]"></div>
          <div className="w-full md:w-1/2 space-y-4">
            <div className="h-8 bg-muted animate-pulse rounded w-3/4"></div>
            <div className="h-6 bg-muted animate-pulse rounded w-1/2"></div>
            <div className="h-4 bg-muted animate-pulse rounded w-full"></div>
            <div className="h-4 bg-muted animate-pulse rounded w-full"></div>
            <div className="h-4 bg-muted animate-pulse rounded w-3/4"></div>
            <div className="h-10 bg-muted animate-pulse rounded w-1/3 mt-6"></div>
            <div className="h-12 bg-muted animate-pulse rounded w-full mt-6"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-8">Sorry, we couldn't find the product you're looking for.</p>
        <Button onClick={() => navigate('/clothing')}>
          Back to Products
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-muted-foreground mb-8">
        <button onClick={() => navigate('/')} className="hover:text-foreground">Home</button>
        <span className="mx-2">/</span>
        <button onClick={() => navigate('/clothing')} className="hover:text-foreground">Clothing</button>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.title}</span>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Images */}
        <div className="w-full md:w-1/2">
          <div className="relative bg-muted rounded-lg overflow-hidden h-[500px]">
            <img 
              src={product.images[currentImageIndex]} 
              alt={product.title} 
              className="w-full h-full object-contain"
            />
            
            {product.images.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 rounded-full p-2 hover:bg-background"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 rounded-full p-2 hover:bg-background"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
                
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full ${
                        index === currentImageIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          
          {/* Thumbnail Gallery */}
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border-2 ${
                    index === currentImageIndex ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.title} thumbnail ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Details */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-xl text-muted-foreground mb-4">{product.category}</p>
          
          <div className="text-2xl font-bold mb-6">${product.price.toFixed(2)}</div>
          
          <p className="text-muted-foreground mb-6">{product.description}</p>
          
          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Size</label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-md border ${
                      selectedSize === size 
                        ? 'border-primary bg-primary/10 text-primary' 
                        : 'border-input hover:border-primary/50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Color</label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-md border ${
                      selectedColor === color 
                        ? 'border-primary bg-primary/10 text-primary' 
                        : 'border-input hover:border-primary/50'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Custom Design Upload */}
          {(product.category.includes('T-Shirts') || product.category.includes('Hoodies')) && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Custom Design (Optional)</label>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCustomDesignUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Button variant="outline" className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Upload Design
                  </Button>
                </div>
                
                {customDesign && (
                  <div className="relative w-16 h-16 rounded-md overflow-hidden">
                    <img 
                      src={customDesign.preview} 
                      alt="Custom design preview" 
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => setCustomDesign(null)}
                      className="absolute top-0 right-0 bg-destructive text-destructive-foreground rounded-bl-md p-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Upload your own artwork to be printed on this item. Supported formats: JPG, PNG (max 5MB)
              </p>
            </div>
          )}
          
          {/* Quantity Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Quantity</label>
            <div className="flex items-center">
              <button
                onClick={decreaseQuantity}
                className="border border-input rounded-l-md px-3 py-2 hover:bg-muted"
                disabled={quantity <= 1}
              >
                -
              </button>
              <div className="border-y border-input px-4 py-2 w-16 text-center">
                {quantity}
              </div>
              <button
                onClick={increaseQuantity}
                className="border border-input rounded-r-md px-3 py-2 hover:bg-muted"
              >
                +
              </button>
            </div>
          </div>
          
          {/* Add to Cart Button */}
          <Button 
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 py-6"
          >
            <ShoppingCart className="h-5 w-5" />
            Add to Cart
          </Button>
          
          {/* Product Details Tabs */}
          <div className="mt-8">
            <Tabs defaultValue="description">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="pt-4">
                <p>{product.description}</p>
              </TabsContent>
              <TabsContent value="details" className="pt-4">
                <ul className="space-y-2">
                  <li><strong>Material:</strong> Premium cotton blend</li>
                  <li><strong>Care:</strong> Machine wash cold, tumble dry low</li>
                  <li><strong>Print Method:</strong> High-quality digital printing</li>
                  <li><strong>Made in:</strong> USA</li>
                </ul>
              </TabsContent>
              <TabsContent value="shipping" className="pt-4">
                <ul className="space-y-2">
                  <li><strong>Processing Time:</strong> 1-3 business days</li>
                  <li><strong>Shipping Time:</strong> 3-5 business days (standard)</li>
                  <li><strong>Express Shipping:</strong> Available at checkout</li>
                  <li><strong>International:</strong> Available to select countries</li>
                </ul>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

