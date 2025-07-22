import { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-primary text-primary-foreground">
      <div className="editorial-layout">
        <div className={`fade-in ${isVisible ? 'visible' : ''} text-center`}>
          <h2 className="serif-display text-5xl md:text-7xl mb-8 font-light">
            Ready to Tell
            <br />
            <span className="italic">Your Story?</span>
          </h2>
          
          <p className="text-xl font-light mb-12 max-w-2xl mx-auto leading-relaxed opacity-90">
            Let's create something extraordinary together. Every great story begins with a conversation.
          </p>

          <Link 
            to="/contact"
            className="inline-flex items-center space-x-3 bg-accent text-accent-foreground px-10 py-5 hover:bg-accent/90 transition-all duration-300 hover:-translate-y-1 group"
          >
            <span className="font-medium tracking-wide text-lg">Start Your Project</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;