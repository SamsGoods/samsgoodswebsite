import { useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ChatbotWidget = () => {
  // Initialize Tidio chat
  useEffect(() => {
    // Add Tidio script to the document
    const script = document.createElement('script');
    script.src = 'https://code.tidio.co/YOUR_TIDIO_KEY.js'; // Replace with actual Tidio key
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      // Clean up
      document.body.removeChild(script);
    };
  }, []);
  
  // Open chat manually
  const openChat = () => {
    if (window.tidioChatApi) {
      window.tidioChatApi.open();
    }
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={openChat}
        size="lg"
        className="h-14 w-14 rounded-full shadow-lg"
      >
        <MessageSquare className="h-6 w-6" />
        <span className="sr-only">Open Chat</span>
      </Button>
    </div>
  );
};

export default ChatbotWidget;

