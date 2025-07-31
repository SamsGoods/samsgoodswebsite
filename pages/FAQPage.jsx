import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  // FAQ categories
  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'orders', name: 'Orders & Shipping' },
    { id: 'products', name: 'Products & Customization' },
    { id: 'beats', name: 'Beats & Licensing' },
    { id: 'returns', name: 'Returns & Refunds' },
    { id: 'account', name: 'Account & Payment' },
  ];
  
  // FAQ data
  const faqs = [
    {
      id: 'faq-1',
      question: 'How long does shipping take?',
      answer: 'Standard shipping typically takes 3-5 business days within the US. International shipping can take 7-14 business days depending on the destination. Expedited shipping options are available at checkout for faster delivery.',
      category: 'orders'
    },
    {
      id: 'faq-2',
      question: 'What is your return policy?',
      answer: 'We accept returns within 30 days of purchase for unused items in original packaging. Custom designs are non-refundable unless there\'s a manufacturing defect. To initiate a return, please contact our customer service team with your order number.',
      category: 'returns'
    },
    {
      id: 'faq-3',
      question: 'How do I track my order?',
      answer: 'Once your order ships, you\'ll receive a tracking number via email. You can use this number to track your package on our website or directly through the carrier\'s website. If you haven\'t received tracking information within 48 hours of your order confirmation, please contact us.',
      category: 'orders'
    },
    {
      id: 'faq-4',
      question: 'How do I upload my custom design?',
      answer: 'You can upload your design during the product customization process. We accept JPG, PNG, and SVG files with a maximum size of 10MB. For best results, use high-resolution images (at least 300 DPI) with transparent backgrounds when possible.',
      category: 'products'
    },
    {
      id: 'faq-5',
      question: 'What beat licensing options do you offer?',
      answer: 'We offer three licensing tiers: Basic ($29.99), Premium ($79.99), and Exclusive ($199.99). Basic licenses include MP3 files and limited usage rights. Premium licenses include WAV files and expanded distribution rights. Exclusive licenses include full trackout files and exclusive ownership rights (the beat is removed from our store after purchase).',
      category: 'beats'
    },
    {
      id: 'faq-6',
      question: 'Can I modify my order after it\'s been placed?',
      answer: 'Order modifications are possible within 2 hours of placing your order. After that, our production process begins and changes cannot be guaranteed. Please contact our customer service team immediately if you need to make changes to your order.',
      category: 'orders'
    },
    {
      id: 'faq-7',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and various cryptocurrencies including Bitcoin, Ethereum, and Litecoin. All payments are processed securely through our payment partners.',
      category: 'account'
    },
    {
      id: 'faq-8',
      question: 'What is the difference between the beat licensing tiers?',
      answer: 'The main differences are in file formats, usage rights, and distribution limits. Basic licenses include MP3 files and allow up to 5,000 streams. Premium licenses include WAV and MP3 files with up to 100,000 streams. Exclusive licenses include full trackout files, unlimited streams, and exclusive ownership rights.',
      category: 'beats'
    },
    {
      id: 'faq-9',
      question: 'How do I care for my custom clothing?',
      answer: 'For best results, wash your custom clothing inside-out in cold water and hang to dry or tumble dry on low heat. Avoid using bleach or harsh detergents. This will help preserve the print quality and extend the life of your garment.',
      category: 'products'
    },
    {
      id: 'faq-10',
      question: 'What if my order arrives damaged?',
      answer: 'If your order arrives damaged, please contact us within 48 hours with photos of the damage. We\'ll arrange for a replacement or refund as soon as possible. We take quality control seriously and want to ensure you\'re completely satisfied with your purchase.',
      category: 'returns'
    },
    {
      id: 'faq-11',
      question: 'Can I cancel my order?',
      answer: 'Orders can be cancelled within 2 hours of placement for a full refund. After that, cancellations are subject to a 10% processing fee if the order hasn\'t shipped. Once an order ships, it cannot be cancelled, but you may return it according to our return policy.',
      category: 'orders'
    },
    {
      id: 'faq-12',
      question: 'What sizes do you offer for clothing?',
      answer: 'Our clothing is available in sizes XS through 3XL for most items. Some specialty items may have a more limited size range. Detailed size charts are available on each product page to help you find the perfect fit.',
      category: 'products'
    },
    {
      id: 'faq-13',
      question: 'How do I download my purchased beats?',
      answer: 'After completing your purchase, you\'ll receive an email with download links for your beats. These links will also be available in your account under "Purchases." Download links expire after 30 days, so please download your beats promptly.',
      category: 'beats'
    },
    {
      id: 'faq-14',
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. Customs fees and import taxes may apply depending on your country\'s regulations and are the responsibility of the customer.',
      category: 'orders'
    },
    {
      id: 'faq-15',
      question: 'How do I reset my password?',
      answer: 'To reset your password, click on the "Forgot Password" link on the login page. Enter the email address associated with your account, and we\'ll send you instructions to create a new password. If you don\'t receive the email, please check your spam folder.',
      category: 'account'
    },
    {
      id: 'faq-16',
      question: 'Can I get a refund for a beat purchase?',
      answer: 'Due to the digital nature of our beats, all sales are final once the beat has been downloaded. If you haven\'t downloaded the beat yet and are experiencing technical issues, please contact our support team for assistance.',
      category: 'returns'
    },
    {
      id: 'faq-17',
      question: 'What file formats do you provide for beats?',
      answer: 'Basic licenses include MP3 files (320kbps). Premium licenses include both WAV (24-bit, 44.1kHz) and MP3 files. Exclusive licenses include WAV, MP3, and individual track stems (trackout files) for maximum flexibility in mixing and production.',
      category: 'beats'
    },
    {
      id: 'faq-18',
      question: 'How long does it take to process an order?',
      answer: 'Standard orders are processed within 1-2 business days. Custom design orders may take 2-3 business days for review and processing. During peak seasons or promotional periods, processing times may be slightly longer.',
      category: 'orders'
    },
    {
      id: 'faq-19',
      question: 'What is your privacy policy?',
      answer: 'We respect your privacy and are committed to protecting your personal information. We collect only necessary information for order processing and never share your data with third parties except as required to fulfill your order. For more details, please view our full Privacy Policy.',
      category: 'account'
    },
    {
      id: 'faq-20',
      question: 'Do you offer bulk discounts?',
      answer: 'Yes, we offer discounts for bulk orders. For clothing orders of 10+ items or beat purchases of 5+ licenses, please contact our sales team for custom pricing. We\'re happy to work with you to meet your needs and budget.',
      category: 'products'
    },
  ];
  
  // Filter FAQs based on search query and active category
  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Frequently Asked Questions</h1>
      
      <div className="max-w-3xl mx-auto">
        {/* Search Bar */}
        <div className="relative mb-8">
          <Input
            type="text"
            placeholder="Search for answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        </div>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
        
        {/* FAQ Accordion */}
        {filteredFAQs.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {filteredFAQs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No results found</h3>
            <p className="text-muted-foreground mb-6">
              We couldn't find any FAQs matching your search. Try different keywords or browse by category.
            </p>
            <Button onClick={() => {setSearchQuery(''); setActiveCategory('all');}}>
              Reset Filters
            </Button>
          </div>
        )}
        
        {/* Contact CTA */}
        <div className="bg-muted rounded-lg p-8 mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Still Have Questions?</h2>
          <p className="text-muted-foreground mb-6">
            Can't find the answer you're looking for? Our team is here to help.
          </p>
          <Button asChild>
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;

