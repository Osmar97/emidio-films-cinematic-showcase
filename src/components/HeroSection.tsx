import { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import heroImage from '@/assets/hero-video-placeholder.jpg';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="cinematic-hero">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video 
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={heroImage} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-white max-w-4xl mx-auto px-8">
          <div className={`fade-in ${isLoaded ? 'visible' : ''}`}>
            <h1 className="serif-display text-5xl md:text-7xl lg:text-8xl mb-6 font-light">
              Cinematic
              <br />
              <span className="italic font-normal">Storytelling</span>
            </h1>
            
            <p className="text-lg md:text-xl font-light tracking-wide mb-12 max-w-2xl mx-auto leading-relaxed">
              Luxury wedding and commercial videography that captures the essence of your most precious moments
            </p>

            {/* Play Button */}
            <button className="play-button flex items-center justify-center mx-auto group">
              <Play className="w-8 h-8 ml-1 text-white group-hover:scale-110 transition-transform duration-300" fill="white" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-px h-16 bg-white/30 animate-pulse"></div>
      </div>
    </section>
  );
};

export default HeroSection;