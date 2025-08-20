import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import ImageGallery from '@/components/ImageGallery';
import { supabase } from '@/integrations/supabase/client';

const Portfolio = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoUrls, setVideoUrls] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Categories
  const categories = [
    { id: 'all', label: 'All Work' },
    { id: 'Real Estate', label: 'Real Estate' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'photography', label: 'Photography' },
    { id: 'Aniversário', label: 'Aniversário' }
  ];

  // Works data
  const works = [
    // Videos
    { id: 1, title: "Tour Imobiliário", category: "Real Estate", videoFile: "realEstate.mov", location: "Pinhal Novo", year: "2024" },
    { id: 2, title: "Institutional – Barbershop", category: "commercial", videoFile: "Barber.mov", location: "Lisbon", year: "2024" },
    { id: 3, title: "Completed Project – Full Interiors", category: "Real Estate", videoFile: "Realestate1.mov", location: "Lisbon", year: "2025" },
    { id: 4, title: "Cozinha Moderna – Projeto Finalizado", category: "Real Estate", videoFile: "Realestate3.mov", location: "Lisbon", year: "2025" },
    { id: 5, title: "Primeiro Aniversário", category: "Aniversário", videoFile: "birthday.mov", location: "Lisbon", year: "2024" },
    { id: 6, title: "Institucional – Concessionária & Destaque BYD", category: "commercial", videoFile: "Car.mov", location: "Lisbon", year: "2025" },

    // Photography / Gallery
    { id: 7, title: "Modern Kitchen Design", category: "photography", image: "/lovable-uploads/3861137d-d523-4c35-ae8e-1fcdc9c7b884.png", location: "Lisbon", year: "2024", isGallery: true, galleryImages: [{ src: "/lovable-uploads/3861137d-d523-4c35-ae8e-1fcdc9c7b884.png", alt: "Modern Kitchen Design" }] },
    { id: 8, title: "Luxury Bathroom", category: "photography", image: "/lovable-uploads/eddbdea2-ade9-46cb-b312-110da2589188.png", location: "Lisbon", year: "2024", isGallery: true, galleryImages: [{ src: "/lovable-uploads/eddbdea2-ade9-46cb-b312-110da2589188.png", alt: "Luxury Bathroom" }] },
    { id: 9, title: "Contemporary Living Space", category: "photography", image: "/lovable-uploads/3eb014d2-6655-43c3-a6c5-c34e52d26f43.png", location: "Lisbon", year: "2024", isGallery: true, galleryImages: [{ src: "/lovable-uploads/3eb014d2-6655-43c3-a6c5-c34e52d26f43.png", alt: "Contemporary Living Space" }] },
    { id: 10, title: "Automotive Interior", category: "photography", image: "/lovable-uploads/01490bb8-896b-4cfd-8c42-60b40c1ae105.png", location: "Lisbon", year: "2024", isGallery: true, galleryImages: [{ src: "/lovable-uploads/01490bb8-896b-4cfd-8c42-60b40c1ae105.png", alt: "Automotive Interior" }] },
    { id: 11, title: "BYD Dashboard Detail", category: "photography", image: "/lovable-uploads/4ce6a192-244f-4b9e-b8cb-44b3a4589f15.png", location: "Lisbon", year: "2024", isGallery: true, galleryImages: [{ src: "/lovable-uploads/4ce6a192-244f-4b9e-b8cb-44b3a4589f15.png", alt: "BYD Dashboard Detail" }] },
    { id: 12, title: "Modern Bathroom Design", category: "photography", image: "/lovable-uploads/b3595b8c-ab4b-4da2-938a-4d8b75559a70.png", location: "Lisbon", year: "2024", isGallery: true, galleryImages: [{ src: "/lovable-uploads/b3595b8c-ab4b-4da2-938a-4d8b75559a70.png", alt: "Modern Bathroom Design" }] },
    { id: 13, title: "Kitchen Collection", category: "photography", image: "/lovable-uploads/0a046e99-1b48-4fbc-ae29-c90fd7662fd5.png", location: "Lisbon", year: "2024", isGallery: true, galleryImages: [
        { src: "/lovable-uploads/0a046e99-1b48-4fbc-ae29-c90fd7662fd5.png", alt: "Modern Kitchen with Island" },
        { src: "/lovable-uploads/c57ee302-dd18-4ccc-ab1a-31078689d7d8.png", alt: "Linear Kitchen Design" },
        { src: "/lovable-uploads/e7d2dcda-67bb-4541-9046-84aa35bc97d1.png", alt: "Kitchen and Living Integration" },
        { src: "/lovable-uploads/618205c7-73c6-434c-87b5-804803b53b0d.png", alt: "Kitchen Detail with Wood Cabinets" }
      ] },
    { id: 14, title: "Automotive Photography", category: "photography", image: "/lovable-uploads/4dc560f0-b80d-4022-bd4e-77a20f06d9f2.png", location: "Lisbon", year: "2024", isGallery: true, galleryImages: [
        { src: "/lovable-uploads/4dc560f0-b80d-4022-bd4e-77a20f06d9f2.png", alt: "White Car Detail" },
        { src: "/lovable-uploads/c04f49cc-5439-4e4f-adf6-a18656287825.png", alt: "White Car Full View" },
        { src: "/lovable-uploads/042fa59f-7773-46f9-8f9b-8252ee85b1cf.png", alt: "Car Interior Detail" }
      ] },
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
                className={`fade-in ${isLoaded ? 'visible' : ''} group`}
                style={{ transitionDelay: `${(index * 0.1) + 0.4}s` }}
              >
                {work.isGallery ? (
                  <ImageGallery
                    images={work.galleryImages}
                    coverImage={work.image}
                    title={work.title}
                    className="mb-6"
                  />
                ) : (
                  <div 
                    className="cursor-pointer"
                    onClick={() => navigate(`/portfolio/${work.id}`)}
                  >
                    <div className="relative overflow-hidden mb-6">
                      {work.videoFile && videoUrls[work.id] ? (
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
                  </div>
                )}
                
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
