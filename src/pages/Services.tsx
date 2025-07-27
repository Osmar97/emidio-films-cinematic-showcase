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
      title: "Fotografia de Imóvel",
      description: "Sessão fotográfica profissional com edição otimizada, ideal para anúncios em plataformas imobiliárias",
      features: [
        "Fotografia profissional de alta qualidade",
        "Edição otimizada para plataformas imobiliárias",
        "Ângulos estratégicos para destacar o imóvel",
        "Correção de cor e luz profissional",
        "Entrega rápida e eficiente"
      ],
      startingPrice: "A partir de 80€"
    },
    {
      title: "Vídeo Imobiliário",
      description: "Filmagens walkthrough do imóvel, tanto internas quanto externas, com edição dinâmica",
      features: [
        "Filmagem walkthrough interna e externa",
        "Edição dinâmica e profissional",
        "Música licenciada incluída",
        "Movimentos de câmera suaves",
        "Destaque dos pontos fortes do imóvel"
      ],
      startingPrice: "A partir de 110€"
    },
    {
      title: "Drone",
      description: "Filmagens aéreas de alta qualidade, perfeitas para destacar imóveis, terrenos ou áreas envolventes",
      features: [
        "Filmagem aérea de alta qualidade",
        "Perspectivas únicas e impactantes",
        "Ideal para imóveis e terrenos",
        "Captação das áreas envolventes",
        "Edição profissional incluída"
      ],
      startingPrice: "A partir de 110€"
    },
    {
      title: "Sessão Completa + Vídeo Walkthrough",
      description: "Sessão fotográfica completa combinada com vídeo walkthrough editado",
      features: [
        "Fotografia profissional completa",
        "Vídeo walkthrough editado",
        "Cobertura interior e exterior",
        "Edição profissional de ambos",
        "Pacote económico e completo"
      ],
      startingPrice: "180€"
    },
    {
      title: "Pacote Premium (Foto + Vídeo + Drone)",
      description: "Cobertura completa: fotografia profissional, vídeo walkthrough editado e filmagem aérea com drone",
      features: [
        "Fotografia profissional completa",
        "Vídeo walkthrough editado",
        "Filmagem aérea com drone",
        "Edição profissional de todo o conteúdo",
        "Cobertura 360° do imóvel"
      ],
      startingPrice: "270€"
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