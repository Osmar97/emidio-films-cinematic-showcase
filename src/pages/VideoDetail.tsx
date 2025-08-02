import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { supabase } from '@/integrations/supabase/client';
import weddingImage from '@/assets/wedding-sample.jpg';
import commercialImage from '@/assets/commercial-sample.jpg';

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
      title: "Real Estate Movie",
      category: "Wedding Film",
      image: weddingImage,
      videoFile: "realEstate.mov", // Add your video file path here
      location: "Tuscany, Italy",
      year: "2024",
      duration: "4:32",
      description: "A timeless love story captured in the rolling hills of Tuscany. Sophia and Marcus celebrated their union surrounded by vineyards and ancient olive groves, creating memories that will last a lifetime.",
      details: {
        venue: "Villa San Crispolto",
        cinematographer: "Emidio Films",
        colorGrade: "Cinematic Film",
        equipment: "RED Komodo 6K, DJI FPV"
      }
    },
    {
      id: 2,
      title: "BarberShop",
      category: "Commercial",
      image: commercialImage,
      videoFile: "Barber.mov",
      location: "Lisboa",
      year: "2024", 
      duration: "2:15",
      description: "Luxury timepiece campaign showcasing the craftsmanship and heritage of Swiss watchmaking. Shot in the heart of Manhattan with dramatic lighting and precise cinematography.",
      details: {
        client: "Heritage Watches",
        cinematographer: "Emidio Films",
        colorGrade: "Commercial Standard",
        equipment: "Arri Alexa Mini, Zeiss Master Primes"
      }
    },
    {
      id: 3,
      title: "Elena & James",
      category: "Wedding Film",
      image: weddingImage,
      videoFile: "elena-james-santorini.mp4", // Add your video file path here
      location: "Santorini, Greece",
      year: "2023",
      duration: "5:18",
      description: "An intimate destination wedding overlooking the Aegean Sea. Elena and James exchanged vows as the sun set over the iconic blue domes of Santorini.",
      details: {
        venue: "Canaves Oia Suites",
        cinematographer: "Emidio Films",
        colorGrade: "Mediterranean Warmth",
        equipment: "Sony FX9, DJI Air 2S"
      }
    },
    {
      id: 4,
      title: "Luxury Timepieces",
      category: "Commercial",
      image: commercialImage,
      videoFile: "luxury-timepieces-milan.mp4", // Add your video file path here
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
                  className="w-full h-full object-contain rotate-[120deg]"
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
            <div className="grid lg:grid-cols-3 gap-16">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
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

              {/* Technical Details */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-medium mb-6">Production Details</h3>
                  <div className="space-y-4">
                    {Object.entries(video.details).map(([key, value]) => (
                      <div key={key} className="flex flex-col">
                        <span className="text-sm text-muted-foreground uppercase tracking-wide mb-1">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </span>
                        <span className="text-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-border">
                  <h3 className="text-lg font-medium mb-4">Share This Film</h3>
                  <div className="flex gap-4">
                    <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Copy Link
                    </button>
                    <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Download
                    </button>
                  </div>
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