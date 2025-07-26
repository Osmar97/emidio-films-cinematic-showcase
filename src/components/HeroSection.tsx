import { useState, useEffect, useRef } from 'react';
import heroImage from '@/assets/BGMovie2.mov';

const HeroSection = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlayThrough = () => {
      setIsVideoLoaded(true);
      setTimeout(() => setIsContentLoaded(true), 300);
    };

    video.addEventListener('canplaythrough', handleCanPlayThrough);
    
    // If video is already loaded
    if (video.readyState >= 4) {
      handleCanPlayThrough();
    }

    return () => {
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
    };
  }, []);

  return (
    <>
      {/* Loading Screen */}
      {!isVideoLoaded && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg font-light tracking-wide">Loading...</p>
          </div>
        </div>
      )}

      <section className="cinematic-hero">
        {/* Background Video */}
        <div className="absolute inset-0">
          <video 
            ref={videoRef}
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
            <div className={`fade-in ${isContentLoaded ? 'visible' : ''}`}>
              <h1 className="serif-display text-5xl md:text-7xl lg:text-8xl mb-6 font-light">
                Cinematic
                <br />
                <span className="italic font-normal">Storytelling</span>
              </h1>
              
              <p className="text-lg md:text-xl font-light tracking-wide mb-12 max-w-2xl mx-auto leading-relaxed">
                Luxury wedding and commercial videography that captures the essence of your most precious moments
              </p>

            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-px h-16 bg-white/30 animate-pulse"></div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;