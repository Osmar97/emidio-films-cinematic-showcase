import { useState, useEffect, useRef } from 'react';
import { Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  const testimonials = [
    {
      id: 1,
      quote: "Emidio captured our wedding day with such artistry and emotion. Every frame tells our story beautifully.",
      author: "Sophia Chen",
      role: "Bride",
      location: "Tuscany Wedding"
    },
    {
      id: 2,
      quote: "Working with Emidio Films elevated our brand campaign beyond our expectations. Pure cinematic excellence.",
      author: "Marcus Rivera",
      role: "Creative Director",
      location: "Heritage Collection"
    }
  ];

  return (
    <section ref={sectionRef} className="py-32 bg-soft-gray">
      <div className="editorial-layout">
        <div className={`fade-in ${isVisible ? 'visible' : ''}`}>
          <div className="text-center mb-20">
            <h2 className="serif-display text-5xl md:text-6xl mb-6">
              Kind
              <br />
              <span className="italic">Words</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`fade-in ${isVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${index * 0.3}s` }}
              >
                <div className="text-center">
                  <div className="mb-8">
                    <Quote className="w-8 h-8 text-accent mx-auto mb-6" />
                    <blockquote className="serif-display text-2xl md:text-3xl leading-relaxed font-light">
                      "{testimonial.quote}"
                    </blockquote>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-sm text-accent">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;