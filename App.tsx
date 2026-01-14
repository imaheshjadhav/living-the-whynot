
import React, { useLayoutEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import GrainOverlay from './components/GrainOverlay';
import OtherSide from './components/Oracle';

declare const gsap: any;
declare const ScrollTrigger: any;

/**
 * =====================================================================
 * 🚀 PROJECT CONFIGURATION AREA
 * Update the data below to change your content library and branding.
 * =====================================================================
 */
const PROJECT_CONFIG = {
  hero: {
    backgroundVideo: "https://assets.mixkit.co/videos/preview/mixkit-slow-motion-of-a-person-walking-in-the-desert-at-sunset-42614-large.mp4",
    fallbackImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=2000",
  },
  archives: {
    reels: [
      {
        url: "https://www.instagram.com/maheyshjadhav/reel/DSObTZ0EerY/",
        title: "THE GOA REEL",
        description: "A spontaneous right turn into the jungle."
      },
      {
        url: "https://www.instagram.com/maheyshjadhav/reel/C-VfPz7S1-z/",
        title: "MOTO DIARIES",
        description: "Finding the rhythm of the open road."
      },
      {
        url: "https://www.instagram.com/maheyshjadhav/reel/C_C7vQPSU4Y/",
        title: "WHY NOT MOMENTS",
        description: "Documenting the glitches in the status quo."
      }
    ],
    backgroundImage: "https://images.unsplash.com/photo-1544735032-6a71dd6ca1bb?auto=format&fit=crop&q=80&w=2000",
  },
  footer: {
    textureImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=2000",
    instagramHandle: "@maheyshjadhav",
    instagramUrl: "https://instagram.com/maheyshjadhav"
  }
};
/** ===================================================================== */

const App: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const [isCinemaMode, setIsCinemaMode] = useState(false);
  const [currentArchiveIdx, setCurrentArchiveIdx] = useState(0);

  const getInstagramEmbedUrl = (url: string) => {
    const idMatch = url.match(/\/(?:reel|reels|p)\/([A-Za-z0-9_-]+)/);
    const id = idMatch ? idMatch[1] : null;
    return id ? `https://www.instagram.com/reel/${id}/embed/?captioned=0` : url;
  };

  const nextArchive = () => setCurrentArchiveIdx((prev) => (prev + 1) % PROJECT_CONFIG.archives.reels.length);
  const prevArchive = () => setCurrentArchiveIdx((prev) => (prev - 1 + PROJECT_CONFIG.archives.reels.length) % PROJECT_CONFIG.archives.reels.length);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.to(".hero-parallax", {
        scrollTrigger: {
          trigger: ".hero-parallax",
          start: "top top",
          end: "bottom top",
          scrub: true
        },
        y: 150,
        opacity: 0.3
      });

      gsap.utils.toArray('.reveal').forEach((el: any) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: "expo.out"
        });
      });

      gsap.to(".stamp-badge", {
        y: -10,
        rotation: 5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="relative bg-vintageCream selection:bg-posterOrange selection:text-vintageYellow">
      <GrainOverlay />
      <Navbar />

      {/* CINEMA MODE MODAL */}
      {isCinemaMode && (
        <div className="fixed inset-0 z-[200] bg-dark/98 backdrop-blur-2xl flex items-center justify-center p-4 animate-in">
          <button 
            onClick={() => setIsCinemaMode(false)}
            className="absolute top-6 right-6 z-[210] group"
          >
            <div className="w-12 h-12 border-4 border-vintageYellow flex items-center justify-center hover:bg-posterOrange hover:border-dark transition-all duration-300 shadow-[4px_4px_0px_#c2410c]">
               <span className="font-display font-black text-2xl text-vintageYellow group-hover:text-dark">✕</span>
            </div>
          </button>
          
          <div className="relative w-full max-w-[420px] aspect-[9/16] bg-black border-4 border-dark shadow-[24px_24px_0px_#c2410c] overflow-hidden">
             <iframe 
              src={getInstagramEmbedUrl(PROJECT_CONFIG.archives.reels[currentArchiveIdx].url)}
              className="w-full h-full border-0"
              allowFullScreen
              scrolling="no"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
             ></iframe>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden border-b-4 border-dark">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-dark">
          <div className="hero-parallax absolute inset-0">
            <video 
              key={PROJECT_CONFIG.hero.backgroundVideo}
              className="w-full h-full object-cover opacity-50 contrast-125 saturate-[0.8]"
              autoPlay muted loop playsInline
              poster={PROJECT_CONFIG.hero.fallbackImage}
            >
              <source src={PROJECT_CONFIG.hero.backgroundVideo} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-dark/40 via-transparent to-dark/80"></div>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-7xl flex flex-col items-center">
          <div className="hero-headline flex flex-col items-center w-full">
            <h2 className="text-[10vw] md:text-[8rem] font-display font-black uppercase tracking-[-0.04em] text-3d-yellow leading-[0.8] whitespace-nowrap reveal">
              GOING TO F*CK AROUND
            </h2>
            <h1 className="text-[10.5vw] md:text-[8.5rem] font-display font-black uppercase tracking-[-0.06em] text-3d-yellow leading-[0.8] mb-12 whitespace-nowrap reveal">
              AND LIVE MY BEST LIFE
            </h1>
          </div>
          
          <div className="hero-cta reveal mt-4">
            <a href="#philosophy" className="group relative inline-flex items-center px-12 py-4 md:px-16 md:py-5 bg-posterOrange border-4 border-dark text-vintageYellow transition-all duration-300 shadow-[12px_12px_0px_#1a1a1a] hover:shadow-[4px_4px_0px_#1a1a1a] active:translate-x-2 active:translate-y-2">
              <span className="relative z-10 font-display font-black text-lg md:text-xl uppercase tracking-widest whitespace-nowrap">Read My Manual</span>
            </a>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="min-h-screen flex items-center bg-vintageCream py-40 px-6 md:px-24">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid md:grid-cols-12 gap-20 items-start">
            <div className="md:col-span-8 reveal">
              <p className="text-5xl md:text-8xl font-display font-black leading-[0.85] text-dark uppercase mb-12 tracking-[-0.04em]">
                "I DON'T <span className="text-posterOrange italic">PLAN</span>, <br />
                I JUST <span className="underline decoration-8 underline-offset-8">DO</span>. <br />
                I'D RATHER <span className="text-cinematicTeal">SUFFER</span> <br /> 
                THAN MISS OUT."
              </p>
            </div>
            <div className="md:col-span-4 reveal flex flex-col justify-between h-full pt-4">
              <div className="font-mono text-sm md:text-lg text-dark/90 space-y-10 font-bold border-l-4 border-posterOrange/30 pl-10">
                <p>Comfort is a slow death. Now, I chase the friction. The awkward silences, the missed flights, and the stories that only happen when you say 'Yes' to the wrong direction.</p>
              </div>
              <div className="mt-20 stamp-badge">
                 <div className="w-24 h-24 border-8 border-posterOrange rounded-full flex items-center justify-center font-display font-black text-3xl text-posterOrange -rotate-12 select-none">M.J</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ARCHIVES SECTION */}
      <section id="archives" className="relative min-h-screen bg-cinematicTeal py-40 border-y-8 border-dark overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src={PROJECT_CONFIG.archives.backgroundImage} 
            className="w-full h-full object-cover opacity-10 grayscale mix-blend-overlay"
            alt="Archives Background"
          />
        </div>
        <div className="container mx-auto px-6 md:px-24 grid lg:grid-cols-2 gap-24 items-center relative z-10">
          <div className="reveal order-1 flex flex-col items-center">
            <div className="relative w-full max-w-[420px] aspect-[9/16] bg-dark border-[12px] border-dark shadow-[40px_40px_0px_#c2410c] overflow-hidden group scanlines mb-12">
              <iframe 
                key={currentArchiveIdx}
                src={getInstagramEmbedUrl(PROJECT_CONFIG.archives.reels[currentArchiveIdx].url)}
                className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700 brightness-75 hover:brightness-100"
                allowFullScreen
                scrolling="no"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              ></iframe>
              <div className="absolute inset-0 pointer-events-none border-4 border-posterOrange/20"></div>
            </div>

            <div className="flex gap-4">
              <button onClick={prevArchive} className="w-16 h-16 bg-dark border-4 border-vintageYellow flex items-center justify-center text-vintageYellow font-display font-black text-2xl hover:bg-posterOrange hover:text-dark transition-all active:scale-95 shadow-[8px_8px_0px_#c2410c]">←</button>
              <button onClick={nextArchive} className="w-16 h-16 bg-dark border-4 border-vintageYellow flex items-center justify-center text-vintageYellow font-display font-black text-2xl hover:bg-posterOrange hover:text-dark transition-all active:scale-95 shadow-[8px_8px_0px_#c2410c]">→</button>
            </div>
          </div>

          <div className="reveal order-2 text-center lg:text-left">
            <div className="inline-block px-4 py-1 bg-dark text-vintageYellow font-mono text-[10px] uppercase tracking-[0.4em] mb-6 font-bold">Transmission {currentArchiveIdx + 1} of {PROJECT_CONFIG.archives.reels.length}</div>
            <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-display font-black mb-10 leading-[0.85] text-3d-yellow uppercase tracking-tighter">THE <br /> ARCHIVES <br /><span className="text-cinematicTeal text-3d-yellow block mt-2 underline decoration-posterOrange underline-offset-8">LIBRARY</span></h2>
            <div className="max-w-md mx-auto lg:mx-0">
              <p className="font-display font-black text-dark text-2xl uppercase mb-8 leading-tight">{PROJECT_CONFIG.archives.reels[currentArchiveIdx].description}</p>
            </div>
            <div className="flex flex-col lg:flex-row gap-6 mt-12 items-center lg:items-start">
              <button onClick={() => setIsCinemaMode(true)} className="inline-flex items-center gap-6 px-12 py-6 bg-dark text-vintageYellow font-display font-black uppercase tracking-[0.2em] hover:bg-posterOrange hover:text-dark transition-all shadow-[12px_12px_0px_#fde68a] active:translate-x-2 active:translate-y-2">EXPAND VIEW</button>
              <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-dark/60 font-black max-w-xs leading-relaxed">Raw footage from the edge. Every frame is a testament to the beauty of being lost.</div>
            </div>
          </div>
        </div>
      </section>

      {/* REFINED BASE CAMP: RESOLVED OVERLAP BY RESTRUCTURING HEADLINE */}
      <footer id="contact" className="bg-dark text-vintageCream py-24 md:py-40 px-6 border-t-8 border-posterOrange relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <img src={PROJECT_CONFIG.footer.textureImage} className="w-full h-full object-cover" alt="Footer Texture" />
        </div>
        
        <div className="reveal max-w-7xl mx-auto relative z-10">
          {/* HEADER ROW: MASSIVE ONE-LINE TITLE */}
          <div className="w-full mb-16 md:mb-24 overflow-hidden">
             <h2 className="text-[12vw] md:text-[10vw] lg:text-[7rem] xl:text-[9rem] font-display font-black uppercase tracking-[-0.04em] text-3d-yellow leading-none whitespace-nowrap text-center">
                JOIN THE FREQUENCY
             </h2>
          </div>

          {/* CONTENT ROW: TWO COLUMNS FOR SOCIAL AND CHAT */}
          <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-start">
            
            {/* LEFT SIDE: SOCIAL HUB */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="flex flex-col items-center lg:items-start w-full">
                <a href={PROJECT_CONFIG.footer.instagramUrl} target="_blank" rel="noopener noreferrer" className="group relative inline-flex flex-col items-center lg:items-start mb-12">
                  <div className="w-32 h-32 md:w-40 md:h-40 border-4 border-vintageYellow flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-posterOrange group-hover:shadow-[16px_16px_0px_#fde68a] shadow-[8px_8px_0px_rgba(253,230,138,0.2)]">
                    <span className="font-display font-black text-5xl md:text-6xl text-vintageYellow group-hover:text-dark">IG</span>
                  </div>
                  <span className="font-display font-black text-2xl md:text-3xl uppercase tracking-[0.2em] text-vintageYellow group-hover:text-posterOrange transition-colors">
                    {PROJECT_CONFIG.footer.instagramHandle}
                  </span>
                </a>

                <div className="w-full max-w-sm border-l-4 border-posterOrange py-4 px-6 bg-[#c2410c]/5">
                  <p className="font-display font-black text-posterOrange text-sm md:text-base uppercase tracking-[0.4em] leading-relaxed">
                    DOCUMENTING THE GLITCHES IN THE STATUS QUO
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: THE ORACLE CHAT */}
            <div id="oracle" className="w-full">
              <div className="mb-8 flex items-center gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-posterOrange font-black opacity-80 whitespace-nowrap">
                  LIVE INTERCEPT: THE OTHER SIDE
                </span>
                <div className="h-[2px] flex-1 bg-posterOrange/20"></div>
              </div>
              <OtherSide />
            </div>

          </div>
        </div>

        {/* BOTTOM BRANDING */}
        <div className="mt-32 pt-12 border-t border-white/5 text-center">
           <p className="font-mono text-[10px] uppercase tracking-[0.8em] text-white/20 font-bold">
              MAHESH JADHAV &copy; 2025 • ALL SIGNALS VESTED
           </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
