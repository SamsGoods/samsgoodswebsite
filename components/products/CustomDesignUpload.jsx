import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const CustomDesignUpload = ({ onDesignUpload, onDesignRemove, existingDesign = null }) => {
  const [design, setDesign] = useState(existingDesign);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  
  // Maximum file size (5MB)
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  
  // Allowed file types
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/svg+xml'];
  
  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      validateAndProcessFile(file);
    }
  };
  
  // Handle drag events
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    
    if (file) {
      validateAndProcessFile(file);
    }
  };
  
  // Validate and process the file
  const validateAndProcessFile = (file) => {
    setError(null);
    
    // Check file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Invalid file type. Please upload a JPEG, PNG, or SVG file.');
      return;
    }
    
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      setError('File size exceeds 5MB limit.');
      return;
    }
    
    // Read the file and create a data URL
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const designData = e.target.result;
      setDesign(designData);
      onDesignUpload(designData);
    };
    
    reader.onerror = () => {
      setError('Error reading file. Please try again.');
    };
    
    reader.readAsDataURL(file);
  };
  
  // Remove the design
  const handleRemoveDesign = () => {
    setDesign(null);
    setError(null);
    onDesignRemove();
    
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // Trigger file input click
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-medium">Custom Design</Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <AlertCircle className="h-4 w-4" />
                <span className="sr-only">Design Guidelines</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>Upload your custom design in JPEG, PNG, or SVG format (max 5MB).</p>
              <p className="mt-2">For best results, use high-resolution images with transparent backgrounds.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      {design ? (
        <div className="relative border rounded-lg overflow-hidden">
          <img 
            src={design} 
            alt="Custom design" 
            className="w-full h-auto max-h-64 object-contain"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8"
            onClick={handleRemoveDesign}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Remove design</span>
          </Button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center ${
            isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/20'
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="bg-muted rounded-full p-3">
              <ImageIcon className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="text-sm text-muted-foreground">
              <p className="font-medium">Drag and drop your design here</p>
              <p>or</p>
            </div>
            <Button 
              type="button" 
              variant="secondary" 
              size="sm"
              onClick={handleButtonClick}
            >
              <Upload className="h-4 w-4 mr-2" />
              Browse Files
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.svg"
              onChange={handleFileChange}
              className="hidden"
            />
            <p className="text-xs text-muted-foreground">
              JPEG, PNG, or SVG (max 5MB)
            </p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="text-sm text-destructive flex items-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          {error}
        </div>
      )}
    </div>
  );
};

export default CustomDesignUpload;

