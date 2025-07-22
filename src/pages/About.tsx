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
              Meet
              <br />
              <span className="italic">Emidio</span>
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
                  <h2 className="serif-display text-3xl mb-6">The Story Behind the Lens</h2>
                  <p className="text-muted-foreground">
                    For over a decade, I've been captivated by the power of visual storytelling. 
                    What began as a passion for capturing fleeting moments has evolved into a 
                    dedicated craft of creating cinematic narratives that transcend time.
                  </p>
                </div>

                <div>
                  <p className="text-muted-foreground">
                    Based between New York and destinations worldwide, I specialize in luxury 
                    weddings and commercial projects that demand both technical excellence and 
                    artistic vision. Each project is approached with meticulous attention to 
                    detail and a deep understanding of the emotions that drive every story.
                  </p>
                </div>

                <div>
                  <p className="text-muted-foreground">
                    My work has been featured in leading publications and has taken me to some 
                    of the world's most beautiful locations. But beyond the accolades, what 
                    drives me is the privilege of documenting life's most precious moments – 
                    those genuine, unguarded instances that reveal the essence of human connection.
                  </p>
                </div>

                <div className="pt-8">
                  <h3 className="serif-display text-2xl mb-4">Philosophy</h3>
                  <p className="text-muted-foreground italic">
                    "Every frame should serve the story. Every story deserves to be told with 
                    honesty, beauty, and respect for the emotions it carries."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Credentials */}
          <div className={`fade-in ${isLoaded ? 'visible' : ''} mt-32`} style={{ transitionDelay: '0.6s' }}>
            <div className="grid md:grid-cols-3 gap-16">
              <div className="text-center">
                <div className="serif-display text-4xl text-accent mb-2">10+</div>
                <p className="text-muted-foreground">Years of Experience</p>
              </div>
              <div className="text-center">
                <div className="serif-display text-4xl text-accent mb-2">200+</div>
                <p className="text-muted-foreground">Stories Told</p>
              </div>
              <div className="text-center">
                <div className="serif-display text-4xl text-accent mb-2">25+</div>
                <p className="text-muted-foreground">Countries Visited</p>
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