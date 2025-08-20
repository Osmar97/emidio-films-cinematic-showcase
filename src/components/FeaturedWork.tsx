import { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const FeaturedWork = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [videoUrls, setVideoUrls] = useState<{ [key: number]: string }>({});
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Featured works data (videos)
  const works = [
    { id: 1, title: "Tour Imobiliário – Casa no Pinhal Novo", category: "Real Estate", videoFile: "realEstate.mov", location: "Pinhal Novo" },
    { id: 2, title: "Institutional – Barbershop", category: "Commercial", videoFile: "Barber.mov", location: "Lisboa" },
    { id: 3, title: "Completed Project – Full Interiors", category: "Real Estate", videoFile: "Realestate1.mov", location: "Lisboa" }
  ];

  // Load video URLs from Supabase
  useEffect(() => {
    const loadVideoUrls = async () => {
      const urls: { [key: number]: string } = {};
      for (const work of works) {
        if (work.videoFile) {
          try {
            const { data } = supabase.storage.from('videos').getPublicUrl(work.videoFile);
            if (data.publicUrl) urls[work.id] = data.publicUrl;
          } catch (error) {
            console.error(`Error loading video ${work.videoFile}:`, error);
          }
        }
      }
      setVideoUrls(urls);
    };

    loadVideoUrls();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-background">
      <div className="editorial-layout">
        <div className={`fade-in ${isVisible ? 'visible' : ''}`}>
          <div className="flex items-end justify-between mb-20">
            <div>
              <h2 className="serif-display text-5xl md:text-6xl mb-4">
                Featured
                <br />
                <span className="italic">Work</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-md">
                Each story is unique, crafted with passion and attention to every detail
              </p>
            </div>
            
            <Link 
              to="/portfolio" 
              className="hidden md:flex items-center space-x-2 text-accent hover:text-primary transition-colors duration-300 group"
            >
              <span className="font-medium tracking-wide">View All Work</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            {works.map((work, index) => (
              <div 
                key={work.id}
                className={`fade-in ${isVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${index * 0.2}s` }}
              >
                <Link to={`/portfolio/${work.id}`} className="group cursor-pointer block">
                  <div className="relative overflow-hidden mb-6">
                    {videoUrls[work.id] ? (
                      <video
                        src={videoUrls[work.id]}
                        className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                        preload="metadata"
                        poster={videoUrls[work.id]}
                        muted
                      />
                    ) : (
                      <div className="w-full aspect-[4/3] flex items-center justify-center bg-black">
                        <span className="text-white">Loading...</span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>

                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="serif-display text-2xl">{work.title}</h3>
                    <p className="text-muted-foreground">{work.location}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="md:hidden mt-12 text-center">
            <Link 
              to="/portfolio" 
              className="inline-flex items-center space-x-2 text-accent hover:text-primary transition-colors duration-300"
            >
              <span className="font-medium tracking-wide">View All Work</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
