import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/hooks/useCart';

import logo from '@/assets/SG ICON.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartItems } = useCart();
  
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Sam's Goods LLC" className="h-10 w-auto" />
            <span className="text-xl font-bold hidden md:block">Sam's Goods LLC</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
            <Link to="/clothing" className="text-foreground hover:text-primary transition-colors">Clothing</Link>
            <Link to="/beats" className="text-foreground hover:text-primary transition-colors">Beats</Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors">About</Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors">Contact</Link>
          </div>

          {/* Search, Cart, and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex relative">
              <Input
                type="text"
                placeholder="Search products..."
                className="w-64 pr-8"
              />
              <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            </div>
            
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-background z-50 md:hidden">
          <div className="flex justify-end p-4">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          <div className="flex flex-col items-center space-y-6 p-8">
            <Link to="/" className="text-xl" onClick={toggleMenu}>Home</Link>
            <Link to="/clothing" className="text-xl" onClick={toggleMenu}>Clothing</Link>
            <Link to="/beats" className="text-xl" onClick={toggleMenu}>Beats</Link>
            <Link to="/about" className="text-xl" onClick={toggleMenu}>About</Link>
            <Link to="/contact" className="text-xl" onClick={toggleMenu}>Contact</Link>
            
            <div className="relative w-full max-w-sm mt-4">
              <Input
                type="text"
                placeholder="Search products..."
                className="w-full pr-8"
              />
              <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

