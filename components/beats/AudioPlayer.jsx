import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

const AudioPlayer = ({ audioSrc, coverArt, title, artist }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const audioRef = useRef(null);
  const animationRef = useRef(null);
  
  // Initialize audio player
  useEffect(() => {
    const audio = new Audio(audioSrc);
    audioRef.current = audio;
    
    // Event listeners
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('canplaythrough', () => setIsLoading(false));
    audio.addEventListener('error', handleError);
    
    // Set initial volume
    audio.volume = volume;
    
    // Clean up
    return () => {
      cancelAnimationFrame(animationRef.current);
      audio.pause();
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('canplaythrough', () => {});
      audio.removeEventListener('error', handleError);
    };
  }, [audioSrc]);
  
  // Handle loaded metadata
  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };
  
  // Handle ended
  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    cancelAnimationFrame(animationRef.current);
  };
  
  // Handle error
  const handleError = () => {
    console.error('Error loading audio');
    setIsLoading(false);
  };
  
  // Toggle play/pause
  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      cancelAnimationFrame(animationRef.current);
    } else {
      audioRef.current.play();
      animationRef.current = requestAnimationFrame(updateProgress);
    }
    
    setIsPlaying(!isPlaying);
  };
  
  // Update progress
  const updateProgress = () => {
    if (!audioRef.current) return;
    
    setCurrentTime(audioRef.current.currentTime);
    animationRef.current = requestAnimationFrame(updateProgress);
  };
  
  // Handle progress change
  const handleProgressChange = (value) => {
    if (!audioRef.current) return;
    
    const newTime = value[0];
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    
    if (!isPlaying) {
      setIsPlaying(true);
      audioRef.current.play();
      animationRef.current = requestAnimationFrame(updateProgress);
    }
  };
  
  // Handle volume change
  const handleVolumeChange = (value) => {
    if (!audioRef.current) return;
    
    const newVolume = value[0];
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
    
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };
  
  // Toggle mute
  const toggleMute = () => {
    if (!audioRef.current) return;
    
    if (isMuted) {
      audioRef.current.volume = volume || 0.5;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };
  
  // Format time (seconds to MM:SS)
  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="flex items-center space-x-4">
      {/* Cover Art */}
      <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
        <img 
          src={coverArt} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <Button
          variant="default"
          size="icon"
          className={`absolute inset-0 bg-black/50 rounded-none ${isPlaying ? 'opacity-100' : 'opacity-0'} hover:opacity-100 transition-opacity`}
          onClick={togglePlay}
          disabled={isLoading}
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5 ml-0.5" />
          )}
        </Button>
      </div>
      
      {/* Player Controls */}
      <div className="flex-grow">
        <div className="flex flex-col space-y-1.5">
          {/* Track Info */}
          <div className="flex justify-between items-center">
            <div className="truncate">
              <span className="text-sm font-medium">{title}</span>
              {artist && (
                <span className="text-xs text-muted-foreground ml-1">by {artist}</span>
              )}
            </div>
            <div className="text-xs text-muted-foreground">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center space-x-2">
            <Slider
              value={[currentTime]}
              min={0}
              max={duration || 100}
              step={0.1}
              onValueChange={handleProgressChange}
              className="flex-grow"
              disabled={isLoading}
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={toggleMute}
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              min={0}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
              className="w-20"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;

