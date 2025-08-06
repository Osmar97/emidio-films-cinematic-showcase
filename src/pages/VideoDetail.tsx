import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { supabase } from '@/integrations/supabase/client';
import EmidioLogoV from '@/assets/EmidioF.png';


const VideoDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Mock video data - in a real app this would come from an API
  const videos = [
    {
      id: 1,
      title: "Tour Imobiliário – Casa no Pinhal Novo",
      category: "Real Estate",
      image: EmidioLogoV,
      videoFile: "realEstate.mov", // Add your video file path here
      location: "Pinhal Novo",
      year: "2024",
      duration: "4:32",
      description: "Registo visual completo de uma propriedade situada no Pinhal Novo, captando a essência do espaço com detalhes de luz, ângulos amplos e um toque cinematográfico. Ideal para divulgação imobiliária com impacto.",
      details: {
        venue: "Casa no Pinhal Novo",
        cinematographer: "Emidio Films",
        colorGrade: "Cinematic Film",
        equipment: "RED Komodo 6K, DJI FPV"
      }
    },
    {
      id: 2,
      title: "Institutional – Barbershop",
      category: "Commercial",
      image: EmidioLogoV,
      videoFile: "Barber.mov",
      location: "Lisboa",
      year: "2024", 
      duration: "2:15",
      description: "Institutional video showcasing the routine and atmosphere of a modern barbershop: from reception to service. Humanized filming, focusing on professionals, the space, and the client experience.",
      details: {
        client: "Modern Barbershop",
        cinematographer: "Emidio Films",
        colorGrade: "Commercial Standard",
        equipment: "Arri Alexa Mini, Zeiss Master Primes"
      }
    },
    {
      id: 3,
      title: "Completed Project – Full Interiors",
      category: "Real Estate",
      image: EmidioLogoV,
      videoFile: "Realestate1.mov", // Add your video file path here
      location: "Lisboa",
      year: "2023",
      duration: "5:18",
      description: "Production made to document the final result of a complete project: modern kitchen, custom furniture for bathroom and laundry, all finished with elegance and precision. A video that values detail, finishing and space harmony, highlighting the assembly company's work in a visually impactful and professional way.",
      details: {
        venue: "Interior Design Project",
        cinematographer: "Emidio Films",
        colorGrade: "Modern Clean",
        equipment: "Sony FX9, DJI Air 2S"
      }
    },
    {
      id: 4,
      title: "House n3",
      category: "Real Estate",
      image: EmidioLogoV,
      videoFile: "Realestate3.mov", // Add your video file path here
      location: "Milan",
      year: "2023",
      duration: "1:45",
      description: "Product showcase for Italian luxury watchmaker featuring macro cinematography and dynamic lighting to highlight the intricate mechanical details.",
      details: {
        client: "Milano Luxury",
        cinematographer: "Emidio Films", 
        colorGrade: "Luxury Gold",
        equipment: "Blackmagic Pocket 6K Pro, Macro Lenses"
      }
    }
  ];

  const video = videos.find(v => v.id === parseInt(id || '0'));

  // Load video from Supabase storage
  useEffect(() => {
    const loadVideo = async () => {
      if (video?.videoFile) {
        try {
          const { data } = supabase.storage
            .from('videos')
            .getPublicUrl(video.videoFile);
          
          setVideoUrl(data.publicUrl);
        } catch (error) {
          console.error('Error loading video:', error);
        }
      }
    };

    loadVideo();
  }, [video]);

  if (!video) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif mb-4">Video not found</h2>
          <button 
            onClick={() => navigate('/portfolio')}
            className="text-accent hover:underline"
          >
            Return to Portfolio
          </button>
        </div>
      </div>
    );
  }

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      {/* Back Button - Fixed to viewport */}
      <div className="fixed top-20 left-8 z-50">
        <button
          onClick={() => navigate('/portfolio')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group bg-background/80 backdrop-blur-sm px-3 py-2 rounded-md"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-sm tracking-wide">Back to Portfolio</span>
        </button>
      </div>

      <div className="min-h-screen">
        <Navigation />

      {/* Video Section */}
      <section className="pt-32 pb-20">
        <div className="editorial-layout">
          <div className={`fade-in ${isLoaded ? 'visible' : ''}`}>
            {/* Video Player */}
            <div className="relative w-full h-[70vh] sm:h-[80vh] bg-black rounded-lg overflow-hidden mb-12 group">
              {videoUrl ? (
                <video 
                  ref={videoRef}
                  src={videoUrl}
                  className="w-full h-full object-contain [transform:rotate(360deg)]"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                  preload="metadata"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-black">
                  <span className="text-white text-lg">Loading video...</span>
                </div>
              )}
              
              {/* Play/Pause Overlay */}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={handlePlayPause}
                  className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-white" />
                  ) : (
                    <Play className="w-8 h-8 text-white ml-1" />
                  )}
                </button>
              </div>
              
              {/* Video Info Overlay */}
              <div className="absolute bottom-6 left-6 text-white">
                <div className="text-sm opacity-80">{video.duration}</div>
              </div>
            </div>

            {/* Video Details */}
            <div>
              {/* Main Content */}
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-sm text-accent uppercase tracking-wide">{video.category}</span>
                    <span className="text-sm text-muted-foreground">{video.year}</span>
                  </div>
                  <h1 className="serif-display text-5xl md:text-6xl mb-4 font-light">
                    {video.title}
                  </h1>
                  <p className="text-xl text-muted-foreground mb-6">{video.location}</p>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-4">About This Film</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {video.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default VideoDetail;