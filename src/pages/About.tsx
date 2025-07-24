import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import ContactCTA from '@/components/ContactCTA';
import emidioPortrait from '@/assets/emidio-portrait.jpg';

const About = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero */}
      <section className="pt-32 pb-20 bg-background">
        <div className="editorial-layout">
          <div className={`fade-in ${isLoaded ? 'visible' : ''}`}>
            <h1 className="serif-display text-6xl md:text-8xl mb-8 font-light">
              <span className="italic">Who We Arbe</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-32 bg-background">
        <div className="editorial-layout">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            {/* Portrait */}
            <div className={`fade-in ${isLoaded ? 'visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
              <div className="relative">
                <img 
                  src={emidioPortrait}
                  alt="Emidio holding cinema camera"
                  className="w-full aspect-[4/5] object-cover"
                />
              </div>
            </div>

            {/* Story */}
            <div className={`fade-in ${isLoaded ? 'visible' : ''}`} style={{ transitionDelay: '0.4s' }}>
              <div className="space-y-8 text-lg leading-relaxed">
                <div>
                  <p className="text-muted-foreground">
                    Emídio Films is an audiovisual production company that transforms ideas into 
                    stories that inspire, move, and sell.
                  </p>
                </div>

                <div>
                  <p className="text-muted-foreground">
                    We work in the areas of real estate video, promotional videos for brands and 
                    local businesses, content creation for social media, events and lifestyle, 
                    always with a creative, simple and authentic approach.
                  </p>
                </div>

                <div>
                  <p className="text-muted-foreground">
                    We believe in the power of simplicity to create images that connect people, 
                    reveal the essence of each project and strengthen brands both digitally and beyond.
                  </p>
                </div>

                <div className="pt-8">
                  <p className="text-muted-foreground">
                    More than beautiful videos, we deliver content that generates real impact and 
                    results for those who trust our work.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <ContactCTA />
    </div>
  );
};

export default About;