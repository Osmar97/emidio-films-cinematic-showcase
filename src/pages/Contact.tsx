import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Instagram, ArrowRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
const Contact = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    location: '',
    service: '',
    message: ''
  });
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-inquiry', {
        body: formData
      });

      if (error) throw error;

      toast({
        title: "Inquiry sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventDate: '',
        location: '',
        service: '',
        message: ''
      });
    } catch (error: any) {
      console.error('Error sending inquiry:', error);
      toast({
        title: "Error sending inquiry",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  return <div className="min-h-screen">
      <Navigation />
      
      {/* Header */}
      <section className="pt-32 pb-20 bg-background">
        <div className="editorial-layout">
          <div className={`fade-in ${isLoaded ? 'visible' : ''}`}>
            <h1 className="serif-display text-6xl md:text-8xl mb-8 font-light">
              Let's
              <br />
              <span className="italic">Connect</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Ready to begin your cinematic journey? Share your vision with us and let's create something extraordinary together.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="pb-32 bg-background">
        <div className="editorial-layout">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Contact Form */}
            <div className={`fade-in ${isLoaded ? 'visible' : ''}`} style={{
            transitionDelay: '0.2s'
          }}>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-3">
                      Full Name *
                    </label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-0 py-3 border-0 border-b border-border bg-transparent focus:border-accent focus:outline-none transition-colors duration-300" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-3">
                      Email Address *
                    </label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-0 py-3 border-0 border-b border-border bg-transparent focus:border-accent focus:outline-none transition-colors duration-300" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-3">
                      Phone Number
                    </label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-0 py-3 border-0 border-b border-border bg-transparent focus:border-accent focus:outline-none transition-colors duration-300" />
                  </div>
                  <div>
                    <label htmlFor="eventDate" className="block text-sm font-medium mb-3">
                      Event Date
                    </label>
                    <input type="date" id="eventDate" name="eventDate" value={formData.eventDate} onChange={handleChange} className="w-full px-0 py-3 border-0 border-b border-border bg-transparent focus:border-accent focus:outline-none transition-colors duration-300" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium mb-3">
                      Event Location
                    </label>
                    <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} className="w-full px-0 py-3 border-0 border-b border-border bg-transparent focus:border-accent focus:outline-none transition-colors duration-300" />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium mb-3">
                      Service Interested In
                    </label>
                    <select id="service" name="service" value={formData.service} onChange={handleChange} className="w-full px-0 py-3 border-0 border-b border-border bg-transparent focus:border-accent focus:outline-none transition-colors duration-300">
                      <option value="">Select a service</option>
                      <option value="wedding">Wedding Film</option>
                      <option value="commercial">Commercial Video</option>
                      <option value="photography">Editorial Photography</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-3">
                    Tell us about your vision *
                  </label>
                  <textarea id="message" name="message" rows={6} value={formData.message} onChange={handleChange} required className="w-full px-0 py-3 border-0 border-b border-border bg-transparent focus:border-accent focus:outline-none transition-colors duration-300 resize-none" placeholder="Share your story, inspiration, and any specific requirements..." />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="luxury-button w-full md:w-auto inline-flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{isSubmitting ? 'Sending...' : 'Send Inquiry'}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className={`fade-in ${isLoaded ? 'visible' : ''}`} style={{
            transitionDelay: '0.4s'
          }}>
              <div className="space-y-12">
                <div>
                  <h3 className="serif-display text-3xl mb-6">Get in Touch</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We typically respond to inquiries within 24 hours. For urgent requests 
                    or questions, feel free to call us directly.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Mail className="w-5 h-5 text-accent" />
                    <span>hello@emidiofilms.com</span>
                  </div>
                  <a 
                    href="https://wa.me/351930532501" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 hover:text-accent transition-colors cursor-pointer"
                  >
                    <Phone className="w-5 h-5 text-accent" />
                    <span>+351 930 532 501</span>
                  </a>
                  <div className="flex items-center space-x-4">
                    <MapPin className="w-5 h-5 text-accent" />
                    <span>Lisbon</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Instagram className="w-5 h-5 text-accent" />
                    <span>@emidio.films</span>
                  </div>
                </div>

                <div className="pt-8 border-t border-border">
                  <h4 className="font-medium mb-4">Booking Timeline</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We recommend booking 6-12 months in advance for wedding films 
                    and 4-8 weeks for commercial projects to ensure availability 
                    and adequate preparation time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default Contact;