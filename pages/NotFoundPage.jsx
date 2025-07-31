import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link to="/">Go Home</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/contact">Contact Support</Link>
          </Button>
        </div>
        
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4">You might be looking for:</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/clothing" className="text-primary hover:underline">Shop Clothing</Link>
            </li>
            <li>
              <Link to="/beats" className="text-primary hover:underline">Browse Beats</Link>
            </li>
            <li>
              <Link to="/about" className="text-primary hover:underline">About Us</Link>
            </li>
            <li>
              <Link to="/faq" className="text-primary hover:underline">FAQ</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

