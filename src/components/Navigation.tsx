import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 hover:text-accent transition-colors duration-300"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full nav-glass border-t border-white/10">
          <div className="editorial-layout py-6">
            <div className="flex flex-col space-y-6">
              <Link 
                to="/" 
                className={`text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
                  isActive('/') ? 'text-accent' : 'hover:text-accent'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/portfolio" 
                className={`text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
                  isActive('/portfolio') ? 'text-accent' : 'hover:text-accent'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Portfolio
              </Link>
              <Link 
                to="/about" 
                className={`text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
                  isActive('/about') ? 'text-accent' : 'hover:text-accent'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/services" 
                className={`text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
                  isActive('/services') ? 'text-accent' : 'hover:text-accent'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                to="/contact" 
                className={`text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
                  isActive('/contact') ? 'text-accent' : 'hover:text-accent'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;