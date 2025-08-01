import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import NewsletterForm from '@/components/newsletter/NewsletterForm';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Newsletter */}
        <div className="mb-12 pb-12 border-b border-white/20">
          <div className="max-w-md mx-auto">
            <NewsletterForm />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Sam's Goods LLC</h3>
            <p className="mb-4">
              Your one-stop shop for custom clothing and premium rap beats. Express yourself with our unique designs or create your own.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white/80">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white/80">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white/80">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white/80">Home</Link>
              </li>
              <li>
                <Link to="/clothing" className="hover:text-white/80">Clothing</Link>
              </li>
              <li>
                <Link to="/beats" className="hover:text-white/80">Beats</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white/80">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white/80">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-xl font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="hover:text-white/80">FAQ</Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-white/80">Shipping & Returns</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white/80">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white/80">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail size={16} />
                <span>Samsgoodshelp@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>123 Beat Street, Music City, USA</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 mt-8 pt-6 text-center">
          <p>&copy; {currentYear} Sam's Goods LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

