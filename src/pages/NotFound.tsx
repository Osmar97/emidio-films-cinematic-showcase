import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navigation from '@/components/Navigation';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center editorial-layout">
          <h1 className="serif-display text-6xl md:text-8xl mb-8 font-light">404</h1>
          <p className="text-xl text-muted-foreground mb-8">This page doesn't exist</p>
          <Link 
            to="/" 
            className="luxury-button inline-flex items-center"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
