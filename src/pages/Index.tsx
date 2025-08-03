import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import FeaturedWork from '@/components/FeaturedWork';
import ContactCTA from '@/components/ContactCTA';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <FeaturedWork />
      <ContactCTA />
    </div>
  );
};

export default Index;
