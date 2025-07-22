import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'nav-glass py-4' : 'py-6'
      }`}
    >
      <div className="editorial-layout flex items-center justify-between">
        <Link 
          to="/" 
          className="serif-display text-2xl font-medium tracking-tight hover:text-accent transition-colors duration-300"
        >
          EMIDIO FILMS
        </Link>
        
        <div className="hidden md:flex items-center space-x-12">
          <Link 
            to="/" 
            className={`text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
              isActive('/') ? 'text-accent' : 'hover:text-accent'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/portfolio" 
            className={`text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
              isActive('/portfolio') ? 'text-accent' : 'hover:text-accent'
            }`}
          >
            Portfolio
          </Link>
          <Link 
            to="/about" 
            className={`text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
              isActive('/about') ? 'text-accent' : 'hover:text-accent'
            }`}
          >
            About
          </Link>
          <Link 
            to="/services" 
            className={`text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
              isActive('/services') ? 'text-accent' : 'hover:text-accent'
            }`}
          >
            Services
          </Link>
          <Link 
            to="/contact" 
            className={`text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
              isActive('/contact') ? 'text-accent' : 'hover:text-accent'
            }`}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;