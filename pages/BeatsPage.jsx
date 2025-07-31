import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { beats } from '@/data/beats';

const BeatsPage = () => {
  const [filteredBeats, setFilteredBeats] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [bpmRange, setBpmRange] = useState([60, 160]);
  const [sortBy, setSortBy] = useState('featured');
  const [isLoading, setIsLoading] = useState(true);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const audioRef = useRef(null);

  // Get unique genres and moods
  const genres = [...new Set(beats.map(beat => beat.genre))];
  const moods = [...new Set(beats.map(beat => beat.mood))];

  // Filter and sort beats
  useEffect(() => {
    setIsLoading(true);
    
    let result = [...beats];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(beat => 
        beat.title.toLowerCase().includes(query) || 
        beat.description.toLowerCase().includes(query) ||
        beat.genre.toLowerCase().includes(query) ||
        beat.mood.toLowerCase().includes(query)
      );
    }
    
    // Filter by genres
    if (selectedGenres.length > 0) {
      result = result.filter(beat => selectedGenres.includes(beat.genre));
    }
    
    // Filter by moods
    if (selectedMoods.length > 0) {
      result = result.filter(beat => selectedMoods.includes(beat.mood));
    }
    
    // Filter by BPM range
    result = result.filter(beat => 
      beat.bpm >= bpmRange[0] && beat.bpm <= bpmRange[1]
    );
    
    // Sort beats
    switch (sortBy) {
      case 'bpm-low':
        result.sort((a, b) => a.bpm - b.bpm);
        break;
      case 'bpm-high':
        result.sort((a, b) => b.bpm - a.bpm);
        break;
      case 'name-asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    
    setFilteredBeats(result);
    
    // Simulate loading for better UX
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, [searchQuery, selectedGenres, selectedMoods, bpmRange, sortBy]);

  // Handle genre checkbox change
  const handleGenreChange = (genre) => {
    setSelectedGenres(prev => {
      if (prev.includes(genre)) {
        return prev.filter(g => g !== genre);
      } else {
        return [...prev, genre];
      }
    });
  };

  // Handle mood checkbox change
  const handleMoodChange = (mood) => {
    setSelectedMoods(prev => {
      if (prev.includes(mood)) {
        return prev.filter(m => m !== mood);
      } else {
        return [...prev, mood];
      }
    });
  };

  // Handle play/pause
  const handlePlayPause = (beat) => {
    if (currentlyPlaying === beat.id) {
      audioRef.current.pause();
      setCurrentlyPlaying(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(beat.audioFile);
      audioRef.current.play();
      setCurrentlyPlaying(beat.id);
      
      // Add event listener for when audio ends
      audioRef.current.addEventListener('ended', () => {
        setCurrentlyPlaying(null);
      });
    }
  };

  // Clean up audio when component unmounts
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Premium Rap Beats</h1>
      
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search beats by name, genre, mood..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-10"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        </div>
        
        <div className="flex gap-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="bpm-low">BPM: Low to High</SelectItem>
              <SelectItem value="bpm-high">BPM: High to Low</SelectItem>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
              <SelectItem value="name-desc">Name: Z to A</SelectItem>
            </SelectContent>
          </Select>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Beats</SheetTitle>
                <SheetDescription>
                  Find the perfect beat for your next track.
                </SheetDescription>
              </SheetHeader>
              
              <div className="py-4">
                <h3 className="text-lg font-medium mb-2">BPM Range</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={bpmRange}
                    min={60}
                    max={160}
                    step={1}
                    onValueChange={setBpmRange}
                  />
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>{bpmRange[0]} BPM</span>
                    <span>{bpmRange[1]} BPM</span>
                  </div>
                </div>
              </div>
              
              <div className="py-4">
                <h3 className="text-lg font-medium mb-2">Genres</h3>
                <div className="space-y-2">
                  {genres.map((genre) => (
                    <div key={genre} className="flex items-center">
                      <Checkbox
                        id={`genre-${genre}`}
                        checked={selectedGenres.includes(genre)}
                        onCheckedChange={() => handleGenreChange(genre)}
                      />
                      <Label
                        htmlFor={`genre-${genre}`}
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {genre}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="py-4">
                <h3 className="text-lg font-medium mb-2">Moods</h3>
                <div className="space-y-2">
                  {moods.map((mood) => (
                    <div key={mood} className="flex items-center">
                      <Checkbox
                        id={`mood-${mood}`}
                        checked={selectedMoods.includes(mood)}
                        onCheckedChange={() => handleMoodChange(mood)}
                      />
                      <Label
                        htmlFor={`mood-${mood}`}
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {mood}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-6">
                <Button 
                  onClick={() => {
                    setSelectedGenres([]);
                    setSelectedMoods([]);
                    setBpmRange([60, 160]);
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Reset Filters
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      {/* Beat Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-muted animate-pulse rounded-lg overflow-hidden">
              <div className="h-64 bg-muted-foreground/20"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-muted-foreground/20 rounded w-3/4"></div>
                <div className="h-4 bg-muted-foreground/20 rounded w-1/2"></div>
                <div className="h-8 bg-muted-foreground/20 rounded w-full mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredBeats.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBeats.map((beat) => (
            <div 
              key={beat.id}
              className="bg-background rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="h-64 overflow-hidden relative group">
                <img 
                  src={beat.coverArt} 
                  alt={beat.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    size="icon" 
                    className="rounded-full bg-primary hover:bg-primary/90"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePlayPause(beat);
                    }}
                  >
                    {currentlyPlaying === beat.id ? (
                      <Pause className="h-6 w-6" />
                    ) : (
                      <Play className="h-6 w-6" />
                    )}
                  </Button>
                </div>
                {currentlyPlaying === beat.id && (
                  <div className="absolute bottom-0 left-0 right-0 bg-primary text-primary-foreground text-center py-1 text-sm">
                    Now Playing
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">{beat.title}</h3>
                  <span className="text-sm font-medium bg-muted px-2 py-1 rounded">{beat.bpm} BPM</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{beat.genre}</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{beat.mood}</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{beat.key}</span>
                </div>
                <p className="text-muted-foreground mb-4 text-sm line-clamp-2">{beat.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-lg font-bold">${beat.pricingTiers.basic.price.toFixed(2)}</span>
                    <span className="text-xs text-muted-foreground ml-1">Basic License</span>
                  </div>
                  <Button asChild size="sm">
                    <Link to={`/beats/${beat.id}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-2xl font-semibold mb-2">No beats found</h3>
          <p className="text-muted-foreground mb-6">Try adjusting your filters or search query.</p>
          <Button 
            onClick={() => {
              setSearchQuery('');
              setSelectedGenres([]);
              setSelectedMoods([]);
              setBpmRange([60, 160]);
            }}
          >
            Reset All Filters
          </Button>
        </div>
      )}
      
      {/* Licensing Info */}
      <div className="mt-16 bg-muted rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Beat Licensing Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-background p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-center">Basic License</h3>
            <p className="text-2xl font-bold text-center mb-4">$29.99</p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                MP3 File
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Non-exclusive rights
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Up to 5,000 streams
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Use for one music video
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Credit required
              </li>
            </ul>
          </div>
          
          <div className="bg-primary text-primary-foreground p-6 rounded-lg shadow-md relative">
            <div className="absolute top-0 right-0 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
              POPULAR
            </div>
            <h3 className="text-xl font-semibold mb-3 text-center">Premium License</h3>
            <p className="text-2xl font-bold text-center mb-4">$79.99</p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg className="h-5 w-5 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                WAV + MP3 Files
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Non-exclusive rights
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Up to 100,000 streams
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Use for one music video
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Distribution on one platform
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Credit required
              </li>
            </ul>
          </div>
          
          <div className="bg-background p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-center">Exclusive License</h3>
            <p className="text-2xl font-bold text-center mb-4">$199.99</p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                WAV + MP3 + Trackout Files
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Exclusive rights
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Unlimited streams
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Unlimited music videos
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Worldwide distribution rights
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Credit required
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeatsPage;

