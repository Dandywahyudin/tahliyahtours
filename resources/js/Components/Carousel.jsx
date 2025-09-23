import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from "../Components/ui/Button";
import image1 from "../../../public/images/caraousel1.png";
import image2 from "../../../public/images/caraousel2.jpg";
import image3 from "../../../public/images/caraousel3.png";
import BlurText from './BlurText';

const heroSlides = [
    {
        title: "Tahliyah Tours & Travel",
        subtitle: "Bimbingan Maksimal Fasilitas Optimal", 
        description: "Wujudkan impian ibadah haji dan umrah Anda bersama TahliyahTour",
        image: image1,
        cta: "Daftar",
        color: "from-orange-500 to-orange-600",
        accent: "text-orange-300",
    },
    {
        title: "PERJALANAN SPIRITUAL",
        subtitle: "Yang Berkesan",
        description: "Rasakan pengalamanan spiritual ibadah anda Bersama TahliyahTour",
        image: image2,
        cta: "Konsultasi",
        color: "from-orange-400 to-orange-700",
        accent: "text-orange-200",
    },
    {
        title: "LAYANAN TERBAIK",
        subtitle: "Untuk Ibadah Anda",
        description: "Dengan bimbingan maksimal dengan fasilitas optimal dan harga terjangkau",
        image: image3,
        cta: "Lihat Paket",
        color: "from-orange-600 to-red-500",
        accent: "text-orange-300",
    },
];

const Carousel = () => {
  const [heroIndex, setHeroIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 6000); // 6 detik
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const goToSlide = (index) => {
    setHeroIndex(index);
  };

  function scrollToSection(sectionId) {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  const handleAnimationComplete = () => {
  };

  return (
    <section 
      id="home" 
      className="relative h-screen overflow-hidden"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      {/* Background Images with Parallax Effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={heroIndex}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transform transition-transform duration-[6000ms] hover:scale-105"
            style={{ backgroundImage: `url(${heroSlides[heroIndex].image})` }}
          >
            {/* Modern Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/60 to-black/80"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={heroIndex}
                  initial={{ opacity: 0, y: 50, x: -50 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  exit={{ opacity: 0, y: -50, x: 50 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="space-y-6"
                >

                  {/* Title */}
                  <div className="space-y-4">
                    <BlurText
                      text={heroSlides[heroIndex].title}
                      delay={100}
                      animateBy="words"
                      direction="top"
                      onAnimationComplete={handleAnimationComplete}
                      className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight drop-shadow-2xl"
                    />
                    <BlurText
                      text={heroSlides[heroIndex].subtitle}
                      delay={200}
                      animateBy="words"
                      direction="top"
                      className={`text-2xl sm:text-3xl lg:text-5xl font-semibold ${heroSlides[heroIndex].accent} drop-shadow-xl`}
                    />
                  </div>

                  {/* Description */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="max-w-2xl"
                  >
                    <p className="text-lg sm:text-xl text-white/90 leading-relaxed drop-shadow-lg">
                      {heroSlides[heroIndex].description}
                    </p>
                  </motion.div>

                  {/* CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  >
                    <Button
                      onClick={() => {
                        if (heroSlides[heroIndex].cta === "Daftar Sekarang") {
                          open("https://wa.me/6289676468999?text=Halo%20TahliyahTour%2C%20saya%20ingin%20konsultasi%20");
                        } else if (heroSlides[heroIndex].cta === "Konsultasi") {
                          open("https://wa.me/6289676468999?text=Halo%20TahliyahTour%2C%20saya%20ingin%20konsultasi%20");
                        } else {
                          scrollToSection("paketperjalanan");
                        }
                      }}
                      size="lg"
                      className={`bg-gradient-to-r ${heroSlides[heroIndex].color} hover:shadow-2xl hover:shadow-orange-500/30 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 group`}
                    >
                      <span>{heroSlides[heroIndex].cta}</span>
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Button>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Decorative Elements */}
            <div className="absolute right-4 lg:right-8 bottom-24 lg:bottom-20 scale-75 lg:scale-100">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="relative"
              >
                {/* Glass Morphism Card with Floating Effects */}
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br from-orange-400/30 to-orange-600/20 backdrop-blur-xl border border-orange-300/30 rounded-2xl shadow-xl rotate-12 hover:rotate-3 transition-transform duration-500"></div>
                <div className="absolute -left-2 -bottom-4 w-16 h-16 bg-gradient-to-tr from-orange-400/20 to-orange-500/10 backdrop-blur-xl border border-orange-200/20 rounded-xl shadow-lg -rotate-6 hover:rotate-0 transition-transform duration-500"></div>
                
                {/* Main Glass Card */}
                <div className="relative">
                  <div className="bg-orange-400/10 backdrop-blur-xl border border-orange-300/15 rounded-2xl p-4 w-48 shadow-2xl hover:bg-orange-500/15 transition-all duration-500">
                    <div className="text-center space-y-2">
                      <h3 className="text-white font-semibold text-base">Izin Kemenag RI</h3>
                      <p className="text-orange-200/80 font-bold text-lg">No. U.12 Tahun 2023</p>
                      <p className="text-white text-xs">PT. Mumtaaz Cahaya Abadi</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
        <div className="flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="group relative"
              aria-label={`Go to slide ${index + 1}`}
            >
              <div className={`w-12 h-2 rounded-full transition-all duration-500 ${
                index === heroIndex 
                  ? 'bg-white shadow-lg shadow-orange-500/50' 
                  : 'bg-white/30 hover:bg-orange-300/50'
              }`}>
                {index === heroIndex && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full shadow-lg"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20 z-30">
        <motion.div
          key={heroIndex}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 6, ease: "linear" }}
          className="h-full bg-gradient-to-r from-orange-400 to-orange-600 shadow-lg"
        />
      </div>
    </section>
  );
};

export default Carousel;
