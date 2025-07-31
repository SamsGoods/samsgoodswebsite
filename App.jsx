import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/hooks/useCart';

// Layout Components
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatbotWidget from '@/components/chat/ChatbotWidget';

// Pages
import HomePage from '@/pages/HomePage';
import ClothingPage from '@/pages/ClothingPage';
import BeatsPage from '@/pages/BeatsPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import BeatDetailPage from '@/pages/BeatDetailPage';
import CartPage from '@/pages/CartPage';
import CheckoutPage from '@/pages/CheckoutPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import FAQPage from '@/pages/FAQPage';
import NotFoundPage from '@/pages/NotFoundPage';

import './App.css';

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow pt-20">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/clothing" element={<ClothingPage />} />
              <Route path="/clothing/:productId" element={<ProductDetailPage />} />
              <Route path="/beats" element={<BeatsPage />} />
              <Route path="/beats/:beatId" element={<BeatDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
        
        {/* Chatbot Widget */}
        <ChatbotWidget />
        
        <Toaster />
      </CartProvider>
    </Router>
  );
}

export default App;
