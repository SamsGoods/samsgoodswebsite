import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Pause, ShoppingCart, Music, Clock, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/hooks/useCart';
import { getBeatById } from '@/data/beats';

const BeatDetailPage = () => {
  const { beatId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart } = useCart();
  
  const [beat, setBeat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [selectedLicense, setSelectedLicense] = useState('basic');
  
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  
  // Fetch beat data
  useEffect(() => {
    const fetchBeat = () => {
      const foundBeat = getBeatById(beatId);
      
      if (foundBeat) {
        setBeat(foundBeat);
      }
      
      setLoading(false);
    };
    
    fetchBeat();
  }, [beatId]);
  
  // Set up audio player
  useEffect(() => {
    if (beat) {
      audioRef.current = new Audio(beat.audioFile);
      
      // Event listeners
      audioRef.current.addEventListener('timeupdate', updateProgress);
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current.duration);
      });
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
        setCurrentTime(0);
      });
      
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.removeEventListener('timeupdate', updateProgress);
          audioRef.current.removeEventListener('loadedmetadata', () => {});
          audioRef.current.removeEventListener('ended', () => {});
        }
      };
    }
  }, [beat]);
  
  // Update progress bar
  const updateProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  
  // Format time (seconds to MM:SS)
  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Handle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  // Handle progress bar click
  const handleProgressClick = (e) => {
    if (!audioRef.current || !progressBarRef.current) return;
    
    const progressBar = progressBarRef.current;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const newTime = clickPosition * audioRef.current.duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    const licenseType = beat.pricingTiers[selectedLicense];
    
    addToCart({
      id: `${beat.id}-${selectedLicense}`,
      title: beat.title,
      price: licenseType.price,
      image: beat.coverArt,
      category: 'Beats'
    }, 1, {
      licenseType: selectedLicense,
      bpm: beat.bpm,
      key: beat.key
    });
    
    toast({
      title: "Added to cart",
      description: `${beat.title} (${licenseType.name}) added to your cart.`,
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
  
  if (!beat) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Beat Not Found</h2>
        <p className="mb-8">Sorry, we couldn't find the beat you're looking for.</p>
        <Button onClick={() => navigate('/beats')}>
          Back to Beats
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
        <button onClick={() => navigate('/beats')} className="hover:text-foreground">Beats</button>
        <span className="mx-2">/</span>
        <span className="text-foreground">{beat.title}</span>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Beat Cover and Player */}
        <div className="w-full md:w-1/2">
          <div className="relative bg-muted rounded-lg overflow-hidden">
            <img 
              src={beat.coverArt} 
              alt={beat.title} 
              className="w-full aspect-square object-cover"
            />
            
            {/* Audio Player Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm p-4">
              <div className="flex items-center gap-4">
                <Button 
                  size="icon" 
                  className="rounded-full bg-primary hover:bg-primary/90 h-12 w-12"
                  onClick={togglePlay}
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6 ml-1" />
                  )}
                </Button>
                
                <div className="flex-grow">
                  <div 
                    ref={progressBarRef}
                    className="h-2 bg-muted-foreground/30 rounded-full cursor-pointer"
                    onClick={handleProgressClick}
                  >
                    <div 
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Beat Info Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-muted/30 p-4 rounded-lg text-center">
              <Music className="h-5 w-5 mx-auto mb-2" />
              <p className="text-sm font-medium">{beat.genre}</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-lg text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2">
                <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
              </svg>
              <p className="text-sm font-medium">{beat.mood}</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-lg text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2">
                <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z" />
                <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" />
                <path d="M14 10V5a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v5" />
                <path d="M10 14v-4" />
                <path d="M14 14v-4" />
              </svg>
              <p className="text-sm font-medium">{beat.key}</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-lg text-center">
              <Clock className="h-5 w-5 mx-auto mb-2" />
              <p className="text-sm font-medium">{beat.bpm} BPM</p>
            </div>
          </div>
        </div>
        
        {/* Beat Details and Licensing */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{beat.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">{beat.genre} • {beat.bpm} BPM</p>
          
          <p className="text-muted-foreground mb-8">{beat.description}</p>
          
          {/* License Selection */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Select License</h2>
            
            <Tabs value={selectedLicense} onValueChange={setSelectedLicense}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="premium">Premium</TabsTrigger>
                <TabsTrigger value="exclusive">Exclusive</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Basic License</h3>
                  <span className="text-2xl font-bold">${beat.pricingTiers.basic.price.toFixed(2)}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {beat.pricingTiers.basic.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
              </TabsContent>
              
              <TabsContent value="premium" className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Premium License</h3>
                  <span className="text-2xl font-bold">${beat.pricingTiers.premium.price.toFixed(2)}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {beat.pricingTiers.premium.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
              </TabsContent>
              
              <TabsContent value="exclusive" className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Exclusive License</h3>
                  <span className="text-2xl font-bold">${beat.pricingTiers.exclusive.price.toFixed(2)}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {beat.pricingTiers.exclusive.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* License Comparison */}
          <div className="bg-muted/30 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">License Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left pb-2">Feature</th>
                    <th className="text-center pb-2">Basic</th>
                    <th className="text-center pb-2">Premium</th>
                    <th className="text-center pb-2">Exclusive</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">File Format</td>
                    <td className="text-center py-2">MP3</td>
                    <td className="text-center py-2">WAV + MP3</td>
                    <td className="text-center py-2">WAV + MP3 + Trackout</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Distribution</td>
                    <td className="text-center py-2">5,000 streams</td>
                    <td className="text-center py-2">100,000 streams</td>
                    <td className="text-center py-2">Unlimited</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Music Videos</td>
                    <td className="text-center py-2">1</td>
                    <td className="text-center py-2">1</td>
                    <td className="text-center py-2">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="py-2">Rights</td>
                    <td className="text-center py-2">Non-exclusive</td>
                    <td className="text-center py-2">Non-exclusive</td>
                    <td className="text-center py-2">Exclusive</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      {/* Similar Beats */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* This would typically be populated with similar beats based on genre, mood, etc. */}
          {/* For now, we'll just show placeholder content */}
          {[...Array(4)].map((_, index) => (
            <div 
              key={index}
              className="bg-background rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="h-48 overflow-hidden relative group">
                <div className="bg-muted w-full h-full"></div>
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" className="rounded-full bg-primary hover:bg-primary/90">
                    <Play className="h-6 w-6 ml-1" />
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">Similar Beat {index + 1}</h3>
                  <span className="text-sm font-medium bg-muted px-2 py-1 rounded">90 BPM</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Trap</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">$29.99</span>
                  <Button size="sm" variant="outline">View</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BeatDetailPage;

