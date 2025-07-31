import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import logo from '@/assets/SG ICON.png';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center mb-8">
          <img src={logo} alt="Sam's Goods LLC Logo" className="h-24 w-auto" />
        </div>
        
        <h1 className="text-4xl font-bold text-center mb-8">About Sam's Goods LLC</h1>
        
        <div className="prose prose-lg max-w-none">
          <p>
            Welcome to Sam's Goods LLC, your premier destination for custom clothing and premium rap beats. 
            Founded in 2023, we've quickly established ourselves as a trusted source for high-quality products 
            that help our customers express their unique style and creativity.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Our Story</h2>
          <p>
            Sam's Goods LLC was born from a passion for music and fashion. Our founder, Sam, started creating 
            beats in his home studio while designing custom t-shirts for friends and family. What began as a 
            hobby quickly grew into a business as demand for his unique designs and professional-quality beats 
            increased.
          </p>
          <p>
            Today, we're proud to offer a wide range of products, from custom t-shirts and hoodies to 
            professional-grade rap beats for artists of all levels. Our commitment to quality and customer 
            satisfaction remains at the heart of everything we do.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
          <p>
            At Sam's Goods LLC, our mission is to provide high-quality, customizable products that allow our 
            customers to express themselves authentically. We believe that personal style and creative expression 
            are powerful forms of communication, and we're dedicated to helping our customers tell their stories 
            through our products.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">What Sets Us Apart</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-muted/30 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
              <p>
                We use only premium materials for our clothing and professional equipment for our beat production. 
                Every product undergoes rigorous quality control to ensure it meets our high standards.
              </p>
            </div>
            <div className="bg-muted/30 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Custom Designs</h3>
              <p>
                Express yourself with our custom design options. Upload your own artwork or work with our team to 
                create something unique that reflects your personal style.
              </p>
            </div>
            <div className="bg-muted/30 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Professional Beats</h3>
              <p>
                Our beats are produced by experienced music professionals using industry-standard equipment. 
                Whether you're a beginner or an established artist, we have beats that will elevate your sound.
              </p>
            </div>
            <div className="bg-muted/30 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Customer Service</h3>
              <p>
                We pride ourselves on providing exceptional customer service. Our team is always ready to answer 
                questions, address concerns, and ensure you have the best possible experience with Sam's Goods LLC.
              </p>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Our Team</h2>
          <p>
            Behind Sam's Goods LLC is a dedicated team of designers, producers, and customer service professionals 
            who are passionate about what they do. Led by our founder, Sam, we work together to create products 
            that inspire and delight our customers.
          </p>
          <p>
            Our designers stay on top of the latest trends while maintaining a unique aesthetic that sets our 
            products apart. Our music producers bring years of experience and a keen ear for what makes a beat 
            stand out. And our customer service team is committed to ensuring that every interaction with 
            Sam's Goods LLC is a positive one.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Our Commitment to Sustainability</h2>
          <p>
            We're committed to reducing our environmental impact. That's why we use eco-friendly materials 
            whenever possible and implement sustainable practices in our production processes. We're constantly 
            looking for ways to improve and do our part for the planet.
          </p>
          
          <div className="bg-primary text-primary-foreground p-8 rounded-lg mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Connect With Us</h2>
            <p className="mb-6">
              We'd love to hear from you! Whether you have questions about our products, need help with an order, 
              or just want to say hello, our team is here for you.
            </p>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

