import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

// Import sample product images
import hoodieImage from '@/assets/Product_Catalog/Trump Original Gangster Mugshot/Trump_Original_Gangster_Mugshot_Hoodie.png';
import mugImage from '@/assets/Product_Catalog/Trump Original Gangster Mugshot/Trump_Original_Gangster_Mugshot_Mug.png';
import whiteTee from '@/assets/Product_Catalog/White Tee/White Tee.png';

// Import sample beat images
import beatImage1 from '@/assets/audio/Beats_for_sale/Blood Season - 85 BPM.png';
import beatImage2 from '@/assets/audio/Beats_for_sale/Mirror Path - 94 BPM.png';
import beatImage3 from '@/assets/audio/Beats_for_sale/Shadow Circuit - 132 BPM.png';

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${whiteTee})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        
        <div className="container mx-auto px-4 relative z-20">
          <motion.div 
            className="max-w-2xl text-white"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Express Your Style</h1>
            <p className="text-xl mb-8">Custom clothing and premium beats for the bold and creative.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/clothing">Shop Clothing</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/beats">Explore Beats</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Button asChild variant="ghost" className="flex items-center gap-2">
              <Link to="/clothing">
                View All <ArrowRight size={16} />
              </Link>
            </Button>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            {/* Product Card 1 */}
            <motion.div variants={fadeIn} className="bg-background rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-64 overflow-hidden">
                <img src={whiteTee} alt="T-Shirt" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Trump: Original Gangster Mugshot Tee</h3>
                <p className="text-muted-foreground mb-4">Classic Crew Neck T-Shirt</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">$22.99</span>
                  <Button asChild size="sm">
                    <Link to="/clothing/SAMO_001">View Details</Link>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Product Card 2 */}
            <motion.div variants={fadeIn} className="bg-background rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-64 overflow-hidden">
                <img src={hoodieImage} alt="Hoodie" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Trump: Original Gangster Mugshot Hoodie</h3>
                <p className="text-muted-foreground mb-4">Unisex Classic Pullover Hoodie</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">$40.99</span>
                  <Button asChild size="sm">
                    <Link to="/clothing/SAMO_012">View Details</Link>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Product Card 3 */}
            <motion.div variants={fadeIn} className="bg-background rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-64 overflow-hidden">
                <img src={mugImage} alt="Mug" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Trump: Original Gangster Mugshot Mug</h3>
                <p className="text-muted-foreground mb-4">Ceramic Mug</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">$15.99</span>
                  <Button asChild size="sm">
                    <Link to="/clothing/SAMO_027">View Details</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Beats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Beats</h2>
            <Button asChild variant="ghost" className="flex items-center gap-2">
              <Link to="/beats">
                View All <ArrowRight size={16} />
              </Link>
            </Button>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            {/* Beat Card 1 */}
            <motion.div variants={fadeIn} className="bg-muted/30 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-64 overflow-hidden relative group">
                <img src={beatImage1} alt="Beat Cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" className="rounded-full bg-primary hover:bg-primary/90">
                    <Music className="h-6 w-6" />
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Blood Season</h3>
                <p className="text-muted-foreground mb-4">85 BPM</p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-lg font-bold">$29.99</span>
                    <span className="text-xs text-muted-foreground ml-2">Basic License</span>
                  </div>
                  <Button asChild size="sm">
                    <Link to="/beats/blood-season">View Details</Link>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Beat Card 2 */}
            <motion.div variants={fadeIn} className="bg-muted/30 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-64 overflow-hidden relative group">
                <img src={beatImage2} alt="Beat Cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" className="rounded-full bg-primary hover:bg-primary/90">
                    <Music className="h-6 w-6" />
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Mirror Path</h3>
                <p className="text-muted-foreground mb-4">94 BPM</p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-lg font-bold">$29.99</span>
                    <span className="text-xs text-muted-foreground ml-2">Basic License</span>
                  </div>
                  <Button asChild size="sm">
                    <Link to="/beats/mirror-path">View Details</Link>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Beat Card 3 */}
            <motion.div variants={fadeIn} className="bg-muted/30 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-64 overflow-hidden relative group">
                <img src={beatImage3} alt="Beat Cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" className="rounded-full bg-primary hover:bg-primary/90">
                    <Music className="h-6 w-6" />
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Shadow Circuit</h3>
                <p className="text-muted-foreground mb-4">132 BPM</p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-lg font-bold">$29.99</span>
                    <span className="text-xs text-muted-foreground ml-2">Basic License</span>
                  </div>
                  <Button asChild size="sm">
                    <Link to="/beats/shadow-circuit">View Details</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Custom Design CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Create Your Custom Design</h2>
            <p className="text-xl mb-8">Upload your artwork and we'll bring your vision to life on our premium clothing.</p>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/clothing">Start Designing</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Sam's Goods</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
              <p className="text-muted-foreground">Premium materials and expert craftsmanship for clothing that lasts.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Professional Beats</h3>
              <p className="text-muted-foreground">Studio-quality beats produced by experienced music professionals.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
              <p className="text-muted-foreground">Multiple secure payment options including credit cards and cryptocurrency.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

