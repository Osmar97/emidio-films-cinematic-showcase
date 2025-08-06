import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import EmidioLogoV from '@/assets/EmidioF.png';

const Portfolio = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    { id: 'all', label: 'All Work' },
    { id: 'Real Estate', label: 'Real Estate' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'photography', label: 'Photography' }
  ];

  const works = [
    {
      id: 1,
      title: "Tour Imobiliário",
      category: "Real Estate",
      image: EmidioLogoV,
      location: "Pinhal Novo",
      year: "2024"
    },
    {
      id: 2,
      title: "Institutional – Barbershop",
      category: "commercial",
      image: EmidioLogoV,
      location: "Lisbon",
      year: "2024"
    },
    {
      id: 3,
      title: "Completed Project – Full Interiors",
      category: "Real Estate",
      image: EmidioLogoV,
      location: "Lisbon",
      year: "2023"
    },
    {
      id: 4,
      title: "Cozinha Moderna – Projeto Finalizado",
      category: "Real Estate",
      image: EmidioLogoV,
      location: "Lisbon",
      year: "2023"
    }
  ];

  const filteredWorks = activeCategory === 'all' 
    ? works 
    : works.filter(work => work.category === activeCategory);

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
              <span className="italic">Portfolio</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
              A curated collection of cinematic stories, each crafted with passion and artistic vision
            </p>
          </div>
        </div>
      </section>

      {/* Filter Navigation */}
      <section className="pb-16 bg-background">
        <div className="editorial-layout">
          <div className={`fade-in ${isLoaded ? 'visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
            <div className="flex flex-wrap gap-8 justify-center border-b border-border pb-8">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
                    activeCategory === category.id 
                      ? 'text-accent border-b-2 border-accent pb-1' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="pb-32 bg-background">
        <div className="editorial-layout">
          <div className="grid md:grid-cols-2 gap-16">
            {filteredWorks.map((work, index) => (
              <div 
                key={work.id}
                className={`fade-in ${isLoaded ? 'visible' : ''} group cursor-pointer`}
                style={{ transitionDelay: `${(index * 0.1) + 0.4}s` }}
                onClick={() => navigate(`/portfolio/${work.id}`)}
              >
                <div className="relative overflow-hidden mb-6">
                  <img 
                    src={work.image}
                    alt={work.title}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>
                  
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="serif-display text-2xl group-hover:text-accent transition-colors">{work.title}</h3>
                    <span className="text-sm text-muted-foreground">{work.year}</span>
                  </div>
                  <p className="text-muted-foreground">{work.location}</p>
                  <p className="text-sm text-accent uppercase tracking-wide">
                    {categories.find(cat => cat.id === work.category)?.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;