import { useState, useEffect } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';

const Services = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      title: "Wedding Films",
      description: "Cinematic storytelling that captures the essence of your special day",
      features: [
        "Full day coverage",
        "Highlight reel (3-5 minutes)",
        "Extended cut (20-30 minutes)",
        "Raw ceremony footage",
        "Professional color grading",
        "Licensed music selection"
      ],
      startingPrice: "From $8,500"
    },
    {
      title: "Commercial Video",
      description: "Premium brand storytelling for luxury businesses and products",
      features: [
        "Concept development",
        "Professional crew",
        "Multiple format delivery",
        "Social media optimization",
        "Brand guideline adherence",
        "Usage rights included"
      ],
      startingPrice: "From $15,000"
    },
    {
      title: "Editorial Photography",
      description: "Sophisticated imagery for publications and personal projects",
      features: [
        "Art direction",
        "Professional retouching",
        "High-resolution delivery",
        "Print release included",
        "Editorial style approach",
        "Lifestyle documentation"
      ],
      startingPrice: "From $3,500"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Header */}
      <section className="pt-32 pb-20 bg-background">
        <div className="editorial-layout">
          <div className={`fade-in ${isLoaded ? 'visible' : ''}`}>
            <h1 className="serif-display text-6xl md:text-8xl mb-8 font-light">
              Our
              <br />
              <span className="italic">Services</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Comprehensive creative services tailored to capture and elevate your most important moments
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-32 bg-background">
        <div className="editorial-layout">
          <div className="grid lg:grid-cols-3 gap-12">
            {services.map((service, index) => (
              <div 
                key={service.title}
                className={`fade-in ${isLoaded ? 'visible' : ''} bg-card border border-border p-8 hover:shadow-lg transition-all duration-500`}
                style={{ transitionDelay: `${index * 0.2}s` }}
              >
                <div className="mb-8">
                  <h3 className="serif-display text-3xl mb-4">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </div>

                <div className="space-y-4 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">{service.startingPrice}</span>
                    <Link 
                      to="/contact"
                      className="inline-flex items-center space-x-2 text-accent hover:text-primary transition-colors duration-300 group"
                    >
                      <span className="text-sm font-medium">Inquire</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className={`fade-in ${isLoaded ? 'visible' : ''} mt-20 text-center`} style={{ transitionDelay: '0.8s' }}>
            <div className="max-w-3xl mx-auto">
              <h2 className="serif-display text-4xl mb-6">Custom Packages Available</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Every project is unique. We work closely with you to create bespoke packages 
                that perfectly align with your vision, timeline, and budget requirements.
              </p>
              <Link 
                to="/contact"
                className="luxury-button inline-flex items-center space-x-3"
              >
                <span>Discuss Your Project</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;